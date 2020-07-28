# Trading Floor


./frontend - npm start
./backend - npm run start:dev

![alt text](https://www.peter-fiorentino.com/static/media/TradingFloor.a8db9845.png) 


To Log in as an existing user:
      email: PFiorentino@gmail.com
      password: abc123
      
Feel free to create a new user though!

A Full Stack react app that uses a SQL database. 

There is a home page that gives you the option to go to the Sign-In page or Register a new user.

The Sign-In page has two input boxes (one for email and one for password) and a button to submit the form and log-in in the user. 

The Register page has three input boxes (one for username, one for email, and one for password) and a button to submit the form and both register and log-in the user.

Once Logged in, the NavBar changes to hold a link to the Portfolio page or the Transactions page, as well as a log-out button.

The Portfolio page has the total value of the user's Portfolio, a list of all of the stocks they own and their current values (green when current price is higher than opening price, red when higher price is lower than opening price, and gray when opening price and current price are equal). The portfolio page also includes the user's cash and a form with two input boxes (a text box for a ticker, and a number box for the quantity of the stocks the purchase) as well as a button that submits the form and makes the purchase provided that the ticker is valid, the quantity is greater than 0, and the user has enough cash to purchase the shares of stock. 

The Transactions page lists all of the transactions the user has made including the ticker, the quantity of shares purchased, and what they paid per share. 
