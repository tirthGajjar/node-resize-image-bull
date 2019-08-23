

## Description

This is an example of processing images in a separate process using [bull](https://github.com/OptimalBits/bull) as 
a queue implementation.

### Requirements:
This project runs out-of-the-box via:
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/)


### Setup

- `docker-compose build`
- `docker-compose up`


### Starting

- `docker-compose up`

  This will start four services that auto reload via **nodemon** inside of the container.

### Environment
  - Node `12.x.x`
  - Express `4.17.1`
  - Redis `latest`
  - Ubuntu `18.0.4`
  - libvips



### Services

 - **image-server**  
 This service serves as the API for the end user to interact with. It will 
 enqueue jobs for the `image-worker` to process.

 - **image-worker**  

   This service sets up a `bull` queue and processor and processes jobs enqueued by the `image-server` via Redis.

   This service resizes images via [sharp](https://github.com/lovell/sharp) and updates each images state in Redis once complete.

 - **test-container**  

    A convenience container that runs tests on each change within test file. 


### Endpoints

- **POST** `/image`

- **GET** `/image/:id`

- **GET** `/image/:id/thumbnail`



### Notes

- **How do I send an image via `POST` to `/image`?**

  For ease of use, I recommend [Postman](https://www.getpostman.com/downloads/). See this [Stack Overflow](https://stackoverflow.com/questions/16015548/tool-for-sending-multipart-form-data-request) answer for details on sending an image.


- **How is data stored?**

  Data Storage for user generated data (i.e. image state and so forth) is stored in redis. Files are stored on local disk.

- **Why isn't the `tmp` folder cleaned up after resize?**

  Left for comparison's sake.  