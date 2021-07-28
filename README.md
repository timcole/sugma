# 🥜 Short URLs Get More Attention
Yet Another URL Shortener...

#### Current features
- Cloudflare for Teams Access
- Temporary and Permanent redirects
- Click tracking

#### Planned features
- Updating links
- Click tracking analytics overview
- UTM campaign management
- Off-site API editing
- On-site Notifications
  - New link created
  - Link was updated by something that you created
- Real-time updates
- ... Open to suggestions and contributions

---

![Screenshot of a prototype](https://cdn.t.pics/cf-shortener.png)
*Image above is a mockup, not a final screenshot*

## About the Project
URL/Link Shorteners have been around forever, this one is no different from the millions of others.  
This one is built with NextJS, secured by Cloudflare Access, with data is stored in Postgres.

![Gif Demo](https://cdn.t.pics/sugma-demo.gif)

## Docker
SUGMA comes with a pre-built Docker image that can be used to deploy it in your favourite docker environment.

## Build it yourself
If you don't use Docker or you want to build it yourself you can do so like so.
```
npm install
npx prisma generate
npm run build
```
Once build you can now run it using `npm start`.

## Setup
SUGMA by default runs on port 3000 but can be changed by setting a `PORT` env.

SUGMA uses [Cloudflare Teams](https://dash.teams.cloudflare.com/) to secure dashboard access.  
Getting started is easy, we just need to head over and add our new SUGMA application to Access and point it to `/admin` like shown below.
![Cloudflare Access App](https://t.pics/rEp4AtyIQ.png)
While you're here, now is a good time to copy our AUD tag and save it as an env called `ACCESS_AUD`, this is required to validate authorization tokens.

Finally, let's set up our database connection. Using Postgres to store data we're going to need our connection DSN saved as an env called `DATABASE_URL`. 
