# Patient Appointment Network Data Application

## Background

This test is made up of the following activities, with the last two being the most important
(as your API can't be made live, otherwise).

 - Write a CRUD application backend which takes into account the below requirements.
 - Document how to get the API running
 - Document how to interact with the API

The above should be provided as a link to a public git repository, or a zipped clone of the git repo.

**As the goal of this task is to get a working replacement live, it is up to you to prioritise the
key functionality that should be implemented. We do not expect you to implement all the functionality.
You should timebox this exercise to a few hours.**

Feel free to include any extra commentary on choices you have made or difficulties you encountered.

## Introduction

You have been tasked with building a new CRUD backend for an MVP tool called the Patient Appointment Network
Data Application (PANDA). The PANDA tracks patient demographic data and associated appointments for each patient.

This tool is being built at pace to replace an ageing system which has been vulnerable to several
recent critical CVEs. The client has decided that getting a working replacement into production is a high
priority, and that extra functionality can be iterated upon after the solution is live.

## Application Requirements

The client has elucidated the following hard requirements for the MVP:

 - It should be possible to add patients to and remove them from the PANDA.
 - It should be possible to check and update patient details in the PANDA.
 - It should be possible to add new appointments to the PANDA, and check and update appointment details.
 - The PANDA may need to be restarted for maintenance, and the data should be persisted.
 - The PANDA backend should communicate with the frontend via some sort of HTTP API.
 - The PANDA API does not need to handle authentication because it is used within a trusted environment.
 - Errors should be reported to the user.

 There are some additional requirements for the data:

 - Appointments can be cancelled, but cancelled appointments cannot be reinstated.
 - Appointments should be considered 'missed' if they are not set to 'attended' by the end of the appointment.
 - Ensure that all [NHS numbers are checksum validated](https://www.datadictionary.nhs.uk/attributes/nhs_number.html).
 - Ensure that all [postcodes can be coerced into the correct format](https://ideal-postcodes.co.uk/guides/uk-postcode-format).

**A separate team has been tasked with building the frontend for the application.** You've spoken with this team to iron
out the separation of responsibilities:

 - They're quite flexible about what they can build, and willing to defer to your choices about implementation.
 - They're flexible about how they interact with the API, as long as you can provide guidance and they can get data in
   JSON format.
 - Due to time constraints, they will not be able to properly validate the inbound data in the frontend, but can
   propagate error responses returned by the backend.
 - All timestamp passed between the backend and frontend must be timezone-aware.

## Additional Considerations

As you've worked with the client for a while, you have an awareness of some past issues and upcoming work
that it might be worth taking into consideration:

 - The client has been burned by vendor lock-in in the past, and prefers working with smaller frameworks.
 - The client highly values automated tests, particularly those which ensure their business logic is implemented
   correctly.
 - The client is in negotiation with several database vendors, and is interested in being database-agnostic
   if possible.
 - The client is somewhat concerned that missed appointments waste significant amounts of clinicians' time,
   and is interested in tracking the impact this has over time on a per-clinician and per-department basis.
 - The PANDA currently doesn't contain much data about clinicians, but will eventually track data about the
   specific organisations they currently work for and where they work from.
 - The client is interested in branching out into foreign markets, it would be useful if error messages
   could be localised.
 - The client would like to ensure that [patient names can be represented correctly, in line with GDPR](https://shkspr.mobi/blog/2021/10/ebcdic-is-incompatible-with-gdpr/).
