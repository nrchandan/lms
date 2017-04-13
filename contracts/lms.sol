pragma solidity ^0.4.0;

import "./strings.sol";


contract lms {
    address owner;

    // In order to use the third-party strings library
    using strings for *;

    // event Owner(string name);

    enum State {
        Available,
        Borrowed,
        Overdue,
        Lost,
        Removed
    }

    enum MemberStatus {
        Active,
        Inactive
    }

    struct Book {
        string title;
        string author;
        string publisher;
        address owner;
        State state;
        uint lastIssueDate;
        uint rating;
    }

    struct Member {
        string name;
        address account;
        MemberStatus status;
        // uint numNewBooks;
        // mapping (uint => Book) books;
    }

    uint numBooks;
    uint numMembers;
    mapping (uint => Book) catalog;
    mapping (uint => Member) members;

    modifier onlyOwner {
        if (msg.sender != owner)
            throw;
        _;
    }

    modifier onlyMember {
        for (uint i=0; i < numMembers; i++) {
            if (msg.sender == members[i].account) {
                _;
            }
        }
        throw;
    }

    function lms(string name) {
        owner = msg.sender;
        // Owner is the first member of our library
        members[numMembers++] = Member(name, owner, MemberStatus.Active);
    }

    function addMember(string name, address account) public onlyOwner {
        members[numMembers++] = Member(name, account, MemberStatus.Active);
    }

    function getOwner() constant returns (string) {
        // Owner(members[0].name);
        return members[0].name;
    }

    function addBook(string title, string author, string publisher) public onlyMember {
        catalog[numBooks++] = Book({
            title: title,
            publisher: publisher,
            author: author,
            owner: msg.sender,
            state: State.Available,
            lastIssueDate: 0,
            rating: 0
        });
    }

    function addMemberWithBooks(
        string name, 
        string speciallyConstructedBooksString, 
        string bookSeparator, 
        string fieldSeparator
    ) returns (string) {
        // Should be called by the prospective member themselves and NOT by anybody else on their
        // behalf.
        // Each book string should be separated from the other by the bookSeparator e.g. semi-colon
        // Within each book string, the three fields title, author and publisher should be 
        // separated by fieldSeparator e.g. pipe (|)
        // e.g. Ethereum|Ben Abner|CreateSpace Independent Publishing Platform
        // return speciallyConstructedBooksString;
        var s = speciallyConstructedBooksString.toSlice();
        var delim = bookSeparator.toSlice();
        // if (s.count(delim) < 2) {       // minimum 3 books required to use this functionality:D
        //     throw;  
        // }
        members[numMembers++] = Member(name, msg.sender, MemberStatus.Active);
        var books = new string[](s.count(delim));
        for(uint i = 0; i < books.length; i++) {
            var book = s.split(delim).toString().toSlice();
            var delim2 = fieldSeparator.toSlice();
            var title = book.split(delim2).toString();
            var author = book.split(delim2).toString();
            var publisher = book.toString();
            addBook(title, author, publisher);
        }
    }

    function kill() public onlyOwner{
        selfdestruct(owner);
    }
}

