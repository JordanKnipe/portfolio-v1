# AngularPortfolio

Updated from my previous version which was written in ReactJS

# Design
I took inspiration of this design from a professional web-application that i developed for Ontapdata. I loved the 'application' feel to it, using a side navbar rather than tradional top header.

# Architecture

This portfolio is hosted on AWS S3 as a static website, and is distributed by Cloudfront, this was done for eventual domain registration along side invalidations on CI/CD uploads.
Current CI/CD uploads from github actions to s3.

Frameworks and tools: ** Angular18, Typescript, HTML/CSS, S3, Cloudfront, API-GateWay**.


# Applications

There are currently 2 sub-applications hosted inside this portfolio, which are current demos.

# Movie New Release Finder Application
This application will eventually be moved onto it's ownw repository and extended further. In it's current state it is used to select your current streaming services, and the user will be able to see all of the movies that they could potentially watch.
This was created for personal use, so i did not have to scroll through on the TV, and having to go through each and every service. TODO: this will be extended to favourite TV shows, and receive updates when news of new seasons or updates come out regarding release dates.


