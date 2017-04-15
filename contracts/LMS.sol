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
    mapping (address => uint) memberIndex;

    modifier onlyMember {
        bool member = false;
        for (uint i=0; i < numMembers; i++) {
            if (msg.sender == members[i].account && members[i].status == MemberStatus.Active) {
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
        // Owner is the first member of our library
        members[numMembers] = Member(name, owner, MemberStatus.Active);
        memberIndex[owner] = numMembers;
        numMembers++;
    }

    function testing(uint8 a1, uint8 a2) constant returns (uint8, uint8) {
//    function testing(uint8 a1, uint8 a2) constant returns (uint8 b1, uint8 b2) {
//        b1 = a1;
//        b2 = a2;
        return (a1, a2);
    }

    function addMember(string name, address account) public onlyOwner {
        members[numMembers] = Member(name, account, MemberStatus.Active);
        memberIndex[account] = numMembers;
        numMembers++;
    }

    function removeMember(address account) public onlyOwner {

    }

    function getOwnerDetails() constant returns (string, address, MemberStatus) {
        return getMemberDetails(owner);
    }

    function getMemberDetails(address account) constant returns (string, address, MemberStatus) {
        var i = memberIndex[account];
        return (members[i].name, members[i].account, members[i].status);
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

    function getMyBooks() constant onlyMember returns (string books, uint8 bookCount) {
        // Iterate over the entire catalog to find my books
        uint8 count;
        string memory bookString;
        for (uint i = 0; i < numBooks; i++) {
            if (catalog[i].owner == msg.sender) {
//                var book = catalog[i].title.toSlice().concat(
//                        ";".toSlice()
//                    ).toSlice().concat(
//                        catalog[i].author.toSlice()
//                    ).toSlice().concat(
//                        ";".toSlice()
//                    ).toSlice().concat(
//                        catalog[i].publisher.toSlice()
//                    );


                var book = ";".toSlice().join([catalog[i].title.toSlice(), catalog[i].publisher.toSlice()]);
//                    catalog[i].author.toSlice(),
//                    catalog[i].publisher.toSlice()
//                    catalog[i].owner.toSlice(),
//                    catalog[i].state.toSlice(),
//                    catalog[i].rating.toSlice()
//                ]);
                count++;
                if (bookString.toSlice().equals("".toSlice())) {
                    bookString = bookString.toSlice().concat(book.toSlice());
                } else {
                    bookString = book;
                }
//                bookString = "|".toSlice().join([bookString.toSlice(), book.toSlice()]);
            }
        }
        return (bookString, count);
//        return ("t;a;p;0x0;0;12345;0", 1);
    }

//    function getAllBooks() constant returns () {
//
//    }

    function addMemberWithBooks(
        string name, 
        string speciallyConstructedBooksString, 
        string bookSeparator, 
        string fieldSeparator
    ) returns (string) {
        // TODO Write tests
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

