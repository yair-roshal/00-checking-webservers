# Node-MySql
 
## Assignment Introduction

In this assignment you are requested to develop a system that will enable health monitoring of webservers in the cloud. A Webserver data structure will include by minimum, the following fields:

-   Name
-   HTTP URL
    (You can add any other field you find useful for the assignment)

## Core Functionality

1. Ability to add / edit / delete / list webservers
2. Development of automated worker that will monitor the webservers status
   a. Each webserver should be sampled at least 1 time per minute
   b. Webserver success status is determined by two factors: (AND)
   i. Getting HTTP Response Code 2xx
   ii. HTTP Response Latency < 60 seconds
   c. Every monitor request should be saved in a dedicated requests table for later use (History)
   d. Server is defined as “Healthy” in case 5 consecutive requests are considered “Success” as defined above
   e. Server is defined as “Unhealthy” in case 3 consecutive requests aren’t considered “Success” as defined above
3. Development of a REST API including the following endpoints:

Create Webserver – Endpoint that will allow creating a new Web Server
Read (Get) Webserver – Should include all basic webserver details, current health status and last 10 requests objects
Update Webserver – Endpoint that will allow updating Web Server
Delete Webserver – Endpoint that will allow deleting Web Server
Get list of all Web Servers and their current health-status
Get list of a specific webserver requests history
 
 
## installation

1. clone project from github :

```
git clone https://github.com/yair-roshal/0-monolith-webservers.git
```

2. install all dependencies :

```
npm i
```

3. run sql server with configutration from sql_config.js and dump drom monolith.sql

4. run project :

```
npm start
 or 
npm run dev
```
