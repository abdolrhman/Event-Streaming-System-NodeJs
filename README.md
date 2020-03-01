# Event Streaming System

A group of modules that do some gathering of user actions on Ads on Websites <br>
Its a one endpoint that receives all events `[pageView, AdImpression, AdClick]`<br>
With different analysis based on the type of event

##Getting Started

##### Install with `npm`:

```sh
git clone https://github.com/abdolrhman/Event-Streaming-System-NodeJs.git
cd Event-Streaming-System-NodeJs
npm install
```

`Make sure Redis Install`

```shell script
sudo apt update
sudo apt install redis-server
```

##### Install with Docker

```
docker-compose  up -d
```

## Objective

- One endpoint to receive all events
- Run some analytics based on the type of Event
- PageView, for each website page, count views and save into db
- AdImpression, save the count of user visitors each month
- AdClick, save user click count, after 3 hits of the same user

## Implementation Structure

- For Getting Data
  - Create one REST End Point which takes a body
    <br>`Another Solution would be to implement SocketIO And client would emit events for each event for simplicity i have used REST`
- For Processing Data

  - there are two implementation
    - one with BullJs `which is Queue Handler with redis Implementation`
    - the other is Kafka `intial implementation is there but i focused on BullJS`
      both Implement `Producer - Consumer Pattern`

- Explain producer-consumer in our case

  - the producer will be rest API or SocketIO emit events, but in our case REST
  - the consumer will be our main function which listen on the queue that is being feed by the producer
  - our consumer will have switch for each event case
  - we also using Mongodb to save our data
    `a better solution would be to handel it inside the Redis it self, but for simplicity i choosed to do it in mongo, redis is nosql too btw`

## Implementation detail
  - for achieving objectives, i created a document schema for each case, also the schema target each event alone and its not built for optimization,normalization etc, `its built for achieving the objective only for simplicity`
  - Schemas :-
    - PageView :-
      - website
      - pageName
      - pageCounts
    - AdsImpressionMonthly
      - AdsImpressionCount
      - Month
    - AdsImpression
      - AdId
      - UserId
      - Month
    - AdClick
      - wClickCount
      - AdId
      - Website
## Implementation Architecture
  - Bull
  
    ![bull](https://github.com/OptimalBits/bull/blob/develop/docs/job-lifecycle.png?raw=true)
  - Kafka
  
    ![kafka](https://i.ibb.co/nB4QDnL/kafka-Speakol-Arch.png)

   ```both implement producer-consumer pattern, we are here using BullJs, and an intial setup for kafka```

## Features 
- PageView live <br>

    ![PageView](https://media.giphy.com/media/S99fjAZ1nXf8fPZtP2/giphy.gif)

- AdClick live<br>

    ![AdClick](https://media.giphy.com/media/S463xieemU27eCWbh2/giphy.gif)

- AdImpression :-
    - Done automatically every last day in month, count the users visit for each website
## problems

1. url format, to cut the url i needed to know the structure if the url, which was not defined
