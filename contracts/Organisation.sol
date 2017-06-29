pragma solidity ^0.4.8;

import "./helper_contracts/strings.sol";
import "./helper_contracts/StringLib.sol";
import "./helper_contracts/zeppelin/ownership/Ownable.sol";

import "./DataStore.sol";
import "./BooksLibrary.sol";
import "./MembersLibrary.sol";


contract Organisation is Ownable {
    using strings for *;
    using BooksLibrary for address;
    using MembersLibrary for address;

    // Status of transaction. Used for error handling.
    event Status(uint indexed statusCode);

    address public bookStore;
    address public memberStore;

    modifier onlyMember {
        var index = DataStore(memberStore).getAddressIndex('account', msg.sender);
        var state = DataStore(memberStore).getIntValue(sha3('state', index));
        if (index != 0 && state == 0) {
            _;
        } else {
            Status(100);
        }
    }

    function Organisation() payable {
        // TODO Check for funds being transferred
        // The contract could also be funded after instantiation through sendTransaction.
    }

    function setDataStore(address _bookStore, address _memberStore) {
        if (_bookStore == 0x0) {
            bookStore = new DataStore();
        } else {
            bookStore = _bookStore;
        }
        if (_memberStore == 0x0) {
            memberStore = new DataStore();
        } else {
            memberStore = _memberStore;
        }
    }

    function getDataStore() constant returns (address, address) {
        return (bookStore, memberStore);
    }

    //////////////////////
    // Member Functions //
    //////////////////////

    function memberCount() constant returns (uint) {
        return memberStore.memberCount();
    }

    function addMember(string name, string email, address account) onlyOwner {
        memberStore.addMember(name, email, account);
    }

    function removeMember(address account) onlyOwner {
        memberStore.removeMember(account);
    }

    function getMember(uint id) constant onlyOwner returns (string memberString) {
        if (id < 1 || id > memberStore.memberCount()) {
            return;
        }
        var (account, state, dateAdded) = memberStore.getMember(id);
        var parts = new strings.slice[](4);
        parts[0] = StringLib.uintToString(id).toSlice();
        parts[1] = StringLib.addressToString(account).toSlice();
        parts[2] = StringLib.uintToString(state).toSlice();
        parts[3] = StringLib.uintToString(dateAdded).toSlice();
        memberString = ";".toSlice().join(parts);
        return memberString;
    }

    function getAllMembers() constant onlyOwner returns (string memberString, uint8 count) {
        string memory member;
        for (uint i = 1; i <= memberStore.memberCount(); i++) {
            member = getMember(i);
            count++;
            if (memberString.toSlice().equals("".toSlice())) {
                memberString = member;
            } else {
                memberString = memberString.toSlice().concat('|'.toSlice()).toSlice().concat(member.toSlice());
            }
        }
    }

    ////////////////////
    // Book Functions //
    ////////////////////

    function bookCount() constant returns (uint) {
        return bookStore.bookCount();
    }

    function addBook(uint isbn13) public onlyMember {
        bookStore.addBook(isbn13);
    }

    function getBook(uint id) constant returns (string bookString) {
        if (id < 1 || id > bookStore.bookCount()) {
            return;
        }
        var (i, isbn, state, owner, borrower, dateAdded, dateIssued, totalRating, reviewersCount) = bookStore.getBook(id);
        var parts = new strings.slice[](9);
        parts[0] = StringLib.uintToString(i).toSlice();
        parts[1] = StringLib.uintToString(isbn).toSlice();
        parts[2] = StringLib.uintToString(state).toSlice();
        parts[3] = StringLib.addressToString(owner).toSlice();
        parts[4] = StringLib.addressToString(borrower).toSlice();
        parts[5] = StringLib.uintToString(dateAdded).toSlice();
        parts[6] = StringLib.uintToString(dateIssued).toSlice();
        parts[7] = StringLib.uintToString(totalRating).toSlice();
        parts[8] = StringLib.uintToString(reviewersCount).toSlice();
        bookString = ";".toSlice().join(parts);
        return bookString;
    }

    function getAllBooks() constant returns (string bookString, uint8 count) {
        string memory book;
        for (uint i = 1; i <= bookStore.bookCount(); i++) {
            book = getBook(i);
            count++;
            if (bookString.toSlice().equals("".toSlice())) {
                bookString = book;
            } else {
                bookString = bookString.toSlice().concat('|'.toSlice()).toSlice().concat(book.toSlice());
            }
        }
    }

    function borrowBook(uint id) payable onlyMember {
        bookStore.borrowBook(id);
    }

    function returnBook(uint id) onlyMember {
        bookStore.returnBook(id);
    }

    function rateBook(uint id, uint rating, uint oldRating, string comments) onlyMember {
        bookStore.rateBook(id, rating, oldRating, comments);
    }

    function kill(address upgradedOrganisation) {
        if (upgradedOrganisation == 0x0) {
            throw;
        }
        Organisation(upgradedOrganisation).setDataStore(bookStore, memberStore);
        DataStore(bookStore).transferOwnership(upgradedOrganisation);
        DataStore(memberStore).transferOwnership(upgradedOrganisation);
        selfdestruct(upgradedOrganisation);
    }
}
