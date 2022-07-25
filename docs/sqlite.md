# sqlite:
 Use on https://www.sqlite.org 

 


https://www.sqlite.org/lang_createtable.html
https://gist.github.com/shernshiou/d56832fad59a46fba04e08d3145d1479
https://www.kittell.net/code/auto-increment-auto-generate-guid/


```sql
CREATE TRIGGER AutoGenerateGUID
AFTER INSERT ON tblUsers
FOR EACH ROW
WHEN (NEW.UserAccountID IS NULL)
BEGIN
   UPDATE tblUsers SET UserAccountID = (select hex( randomblob(4)) || '-' || hex( randomblob(2))
             || '-' || '4' || substr( hex( randomblob(2)), 2) || '-'
             || substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
             substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)) ) WHERE rowid = NEW.rowid;
END;
```