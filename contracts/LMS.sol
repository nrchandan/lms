pragma solidity ^0.4.0;

import "./strings.sol";
import "zeppelin/lifecycle/Killable.sol";

contract LMS is Killable {
    // In order to use the third-party strings library
    using strings for *;

    enum State {
        Available,
        Borrowed,
        Overdue,
        Lost,
        Removed
    }

    enum MemberStatus { Active, Inactive }

    struct Book {
        string title;
        string author;
        string publisher;
        address owner;
        State state;
        uint lastIssueDate;
        uint8 rating;
    }

    struct Member {
        string name;
        address account;
        MemberStatus status;
    }

    uint public numBooks;
    uint public numMembers;
    mapping (uint => Book) catalog;
    mapping (uint => Member) members;

    modifier onlyMember {
        bool member = false;
        for (uint i=0; i < numMembers; i++) {
            if (msg.sender == members[i].account) {
                member = true;
                break;
            }
        }
        if (!member) {
            throw;
        } else {
            _;
        }
    }

    function LMS(string name) {
        owner = msg.sender;
        // Owner is the first member of our library
        members[numMembers++] = Member(name, owner, MemberStatus.Active);
    }

    function testing(uint8 a1, uint8 a2) constant returns (uint8, uint8) {
//    function testing(uint8 a1, uint8 a2) constant returns (uint8 b1, uint8 b2) {
//        b1 = a1;
//        b2 = a2;
        return (a1, a2);
    }

    function addMember(string name, address account) public onlyOwner {
        members[numMembers++] = Member(name, account, MemberStatus.Active);
    }

    function getOwnerDetails() constant returns (string, address, MemberStatus) {
        return getMemberDetails(owner);
    }

    function getMemberDetails(address account) constant returns (string, address, MemberStatus) {
        for (uint i = 0; i < numMembers; i++) {
            if (members[i].account == account) {
                return (members[0].name, members[0].account, members[0].status);
            }
        }
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

}

