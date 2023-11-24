# help_desk
## About
This application implements a help desk support service. Users may submit tickets describing their issues.
<br> 
There is also an Admin Center with a Ticket Portal that organizes the tickets based on their statuses: **New**, **In Progress**, or **Resolved**.                                              
        <br> 
Tickets may be sorted by their creation date (Newest->Oldest or vice versa). Admins may reply to the tickets or mark them as pending. Server-side, the app leverages <a href=https://github.com/winstonjs/winston>winston</a> to generate logs on ticket submissions as well as errors. 

## Getting Started

The app is deploy via AWS. You can visit the <a href=http://help-desk-ui-env.eba-eugq23hz.us-east-1.elasticbeanstalk.com/>link</a> to check it out. 

### Local

The app was developed leveraging a Postgres container. In order to run the app in dev mode:

1) Clone the repo and cd into it
2) `npm install`
3) Issue `npm run compose` and wait a few seconds for the db to initialize. (You must have Docker installed) 
4) Issue `npm run dev`
5) Head to localhost:8080 to use the app.


### Logs
In order to see the logs generated on the server (running on PORT 3000), you may issue either 
- `curl http://localhost:3000/api/logs/` to get all logs
- `curl http://localhost:3000/api/logs/errors` to get only the errors.
- You can also check out the logs on the AWS link by adding `/api/logs` to the path of the base url. 

### Enjoy!

### Author
 [LinkedIn](https://linkedin.com/in/kobudnik) 

