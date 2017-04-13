Workflow:
- Books will remain with the owners when they are in "available" state
- Readers will need to locate the owners to "borrow" the book
- Owner and Reader will both ensure that the book is "borrowed" in the app
- Reader will return the book to the owner.
- Both owner and reader will ensure that the book is "returned" in the app
- Cron task to send reminders for overdue books
- Cron task to send a dairy summary email to admins
- When a person is leaving, all the "available" books of the member should become
  "removed" and books in circulation needs to be returned/collected. Member status
  should be changed to "inactive"

Open Items:
- How do you ensure that Cron runs every day (through daily summary email for now)?
