import {
  libraryReducer,
  loadingReducer,
  errorReducer,
  allBooksReducers,
  ownerDetailsReducer,
  myBooksReducers,
  addBookReducer,
  returnBookReducer,
  borrowBookReducer,
  rateBookReducer,
  existingMemberReducer
} from '../../../reducers/libraryReducer'

describe('Reducers', () => {
  describe('libraryReducer', () => {
    it('should return initial state', () => {
      expect(libraryReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_ACCOUNTS_SUCCESS', () => {
      expect(
        libraryReducer(undefined, {
          type: 'GET_ACCOUNTS_SUCCESS',
          payload: [
            '0xb'
          ]
        })).toEqual(['0xb'])
    })
    it('should handle GET_USER_BALANCE_SUCCESS', () => {
      const payload = {
        value: '123',
        toNumber: () => {
          return +payload.value
        }
      }
      expect(
        libraryReducer(undefined, {
          type: 'GET_USER_BALANCE_SUCCESS',
          payload
        })).toEqual({ balance: 123 })
    })
  })
  describe('loadingReducer', () => {
    it('should return initial state', () => {
      expect(loadingReducer(undefined, {})).toEqual({})
    })
    it('should handle GET_ACCOUNTS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ACCOUNTS_LOADING',
          payload: true
        })).toEqual({ 'accountsLoading' : true })
    })
    it('should handle GET_OWNERDETAILS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_OWNERDETAILS_LOADING',
          payload: true
        })).toEqual({ 'ownerDetailsLoading' : true })
    })
    it('should handle GET_ALL_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ALL_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'allbooksloading' : true })
    })
    it('should handle GET_MY_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_MY_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'myBooksLoading' : true })
    })
    it('should handle GET_ADD_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ADD_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'addBooksLoading' : true })
    })
    it('should handle GET_BORROW_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_BORROW_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'borrowBooksLoading' : true })
    })
    it('should handle GET_RETURN_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_RETURN_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'returnBooksLoading' : true })
    })
    it('should handle RATE_BOOK_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'RATE_BOOK_LOADING',
          payload: true
        })).toEqual({ 'rateBookLoading' : true })
    })
    it('should handle GET_MEMBER_DETAILS_EMAIL_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_MEMBER_DETAILS_EMAIL_LOADING',
          payload: true
        })).toEqual({ 'loginLoader' : true })
    })
    it('should handle CREATE_ACCOUNT_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'CREATE_ACCOUNT_LOADING',
          payload: true
        })).toEqual({ 'createAccountLoader' : true })
    })
    it('should handle ADD_MEMBER_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'ADD_MEMBER_LOADING',
          payload: true
        })).toEqual({ 'addMemberLoader' : true })
    })
  })
  describe('errorReducer', () => {
    it('should return initial state', () => {
      expect(errorReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_ACCOUNTS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_ACCOUNTS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_OWNERDETAILS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_OWNERDETAILS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_ALL_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_ALL_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_MY_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_MY_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_ADD_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_ADD_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle RATE_BOOK_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'RATE_BOOK_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_RETURN_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_RETURN_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_BORROW_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_BORROW_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_MEMBER_DETAILS_EMAIL_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_MEMBER_DETAILS_EMAIL_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle GET_RATE_BOOK_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_RATE_BOOK_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle CREATE_ACCOUNT_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'CREATE_ACCOUNT_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
    it('should handle ADD_MEMBER_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'ADD_MEMBER_ERROR',
          payload: 'ERROR'
        })).toEqual({"message": "ERROR"})
    })
  })
  describe('ownerDetailsReducer', () => {
    it('should return initial state', () => {
      expect(ownerDetailsReducer(undefined, {})).toEqual({})
    })
    it('should handle GET_OWNERDETAILS_SUCCESS', () => {
      expect(
        ownerDetailsReducer(undefined, {
          type: 'GET_OWNERDETAILS_SUCCESS',
          payload: [
            'Owner',
            'account',
            'status',
            'dateAdded'
          ]
        })).toEqual({
          'name' : 'Owner',
          'account' : 'account',
          'status' : 'status',
          'dateAdded' : 'dateAdded'
        })
    })
  })
  describe('allBooksReducers', () => {
    let books;
    beforeEach(() => {
      books = [{
        'id': '1',
        'title': 'Title',
        'author': 'Author',
        'publisher': 'Publisher',
        'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
        'borrower': '0x0000000000000000000000000000000000000000',
        'state': '0',
        'dateAdded': '1493054441',
        'dateIssued': '0',
        'imageUrl' : '',
        'description' : '',
        'genre' : 'Literature',
        'avgRating': +'0',
        'totalRating': +'0',
        'reviewersCount': +'0'
      }]
      Date.now = jest.fn(() => '1493054441')
    })

    it('should return initial state', () => {
      expect(allBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_ALL_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers(undefined, {
          type: 'GET_ALL_BOOKS_SUCCESS',
          payload: [
            '1;Title;Author;Publisher;ba21a9b09d528b2e1726d786a1d1b861032dba87;0000000000000000000000000000000000000000;0;1493054441;0;;;Literature;0;0;0'
          ]
        })).toEqual({
          allBooks : books
        })
    })
    it('should handle SEARCH_BOOK', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'SEARCH_BOOK',
          payload: 'Title'
        })).toEqual({
          allBooks : books,
         filteredBooks : books,
         value: 'Title'
        })
    })
    it('should handle GET_RATE_BOOK_SUCCESS when reviewer is not present', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_RATE_BOOK_SUCCESS',
          payload: {
            'bookId': '1',
            'reviewer': '0xeeffa82fb768e9057d7967f672a3d0a6116d2528',
            'rating': 3,
            'comments': 'Awesome',
            'timestamp': '1494410074',
            'flag': true
          }
        })).toEqual({
          allBooks : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0x0000000000000000000000000000000000000000',
            'state': '0',
            'dateAdded': '1493054441',
            'dateIssued': '0',
            'imageUrl' : '',
            'description' : '',
            'genre' : 'Literature',
            'avgRating': 3,
            'totalRating': 3,
            'reviewersCount': 1,
            'reviewers': ['0xeeffa82fb768e9057d7967f672a3d0a6116d2528'],
            'ratings': [3]
          }]
        })
    })
    it('should handle GET_RATE_BOOK_SUCCESS when reviewer is already present', () => {
      books[0].reviewers = ['0xeeffa82fb768e9057d7967f672a3d0a6116d2528']
      books[0].ratings = [3]
      books[0].rating = 3
      books[0].totalRating = 3
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_RATE_BOOK_SUCCESS',
          payload: {
            'bookId': '1',
            'reviewer': '0xeeffa82fb768e9057d7967f672a3d0a6116d2528',
            'rating': 3,
            'comments': 'Awesome',
            'timestamp': '1494410074'
          }
        })).toEqual({
          allBooks : books
        })
    })
    it('should handle GET_ADD_BOOKS_SUCCESS', () => {
      const book = {
        'title': 'Title',
        'author': 'Author',
        'publisher': 'Publisher',
        'owner': {
            'account': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
        },
        'imageUrl' : 'url',
        'description' : 'description',
        'genre' : 'genre'
      }
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_ADD_BOOKS_SUCCESS',
          payload: book
        })).toEqual({
          allBooks : [
            ...books,
            {
              'id' : 2,
              'title' : book.title,
              'author' : book.author,
              'publisher' : book.publisher,
              'owner' : book.owner.account,
              'borrower' : '0x0',
              'state' : '0',
              'dateAdded' : '1493054441',
              'dateIssued' : '0',
              'imageUrl' : book.imageUrl,
              'description' : book.description,
              'genre' : book.genre,
              'avgRating': 0,
              'totalRating': 0,
              'reviewersCount': 0,
            }
          ]
        })
    })
    it('should handle GET_BORROW_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_BORROW_BOOKS_SUCCESS',
          payload: {
            book: books[0],
            owner: '0xba21a9b09d528b2e1726d786a1d1b861032dba87'
          }
        })).toEqual({
          allBooks : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'state': '1',
            'dateAdded': '1493054441',
            'dateIssued': '1493054441',
            'avgRating': 0,
            'totalRating': 0,
            'reviewersCount': 0,
            'imageUrl' : '',
            'description' : '',
            'genre' : 'Literature'
          }]
        })
    })
    it('should handle GET_RETURN_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_RETURN_BOOKS_SUCCESS',
          payload: books[0]
        })).toEqual({
          allBooks : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0x0',
            'state': '0',
            'dateAdded': '1493054441',
            'dateIssued': '0',
            'avgRating': 0,
            'totalRating': 0,
            'reviewersCount': 0,
            'imageUrl' : '',
            'description' : '',
            'genre' : 'Literature'
          }]
        })
    })
  })
  describe('myBooksReducers', () => {
    it('should return initial state', () => {
      expect(myBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_MY_BOOKS_SUCCESS', () => {
      expect(
        myBooksReducers(undefined, {
          type: 'GET_MY_BOOKS_SUCCESS',
          payload: [
            '1;Title;Author;Publisher;ba21a9b09d528b2e1726d786a1d1b861032dba87;0000000000000000000000000000000000000000;0;1493054441;0'
          ]
        })).toEqual([{
          'id': '1',
          'title': 'Title',
          'author': 'Author',
          'publisher': 'Publisher',
          'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
          'borrower': '0x0000000000000000000000000000000000000000',
          'state': '0',
          'dateAdded': '1493054441',
          'dateIssued': '0'
        }])
    })
  })
  describe('myBooksReducers', () => {
    it('should return initial state', () => {
      expect(myBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_MY_BOOKS_SUCCESS', () => {
      expect(
        myBooksReducers(undefined, {
          type: 'GET_MY_BOOKS_SUCCESS',
          payload: [
            '1;Title;Author;Publisher;ba21a9b09d528b2e1726d786a1d1b861032dba87;0000000000000000000000000000000000000000;0;1493054441;0'
          ]
        })).toEqual([{
          'id': '1',
          'title': 'Title',
          'author': 'Author',
          'publisher': 'Publisher',
          'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
          'borrower': '0x0000000000000000000000000000000000000000',
          'state': '0',
          'dateAdded': '1493054441',
          'dateIssued': '0'
        }])
    })
  })
  describe('existingMemberReducer', () => {
    it('should return initial state', () => {
      expect(existingMemberReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_MEMBER_DETAILS_EMAIL_SUCCESS', () => {
      expect(
        existingMemberReducer(undefined, {
          type: 'GET_MEMBER_DETAILS_EMAIL_SUCCESS',
          payload: true
        })).toEqual(true)
    })
    it('should handle LOGOUT', () => {
      expect(
        existingMemberReducer(undefined, {
          type: 'LOGOUT',
          payload: []
        })).toEqual([])
    })
    it('should handle UNLOCK_ACCOUNT_ERROR', () => {
      expect(
        existingMemberReducer(undefined, {
          type: 'UNLOCK_ACCOUNT_ERROR',
          payload: []
        })).toEqual([])
    })
  })
})
