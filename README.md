for sync of getting items, we could do /GET request on first init of application and save those values in DB, after that all newly created users on intergrate services will be sent via webhook. 
We can save those values using brute force algorithm. But ideally proccessing using queues.
Google: pubsub, AWS: SQS, Redis: Bullmq, etc.

Also, about CRUD operations:

If we want to the source of true to be on third service, then current implementation will work

For example, we create new task item. Firstly, we send item to the integrated service and then via webhook we get it and save response value. 

But we can also doing both things in one step. We can save value in our db + send value to the integrated service (if we actually need doing this ) and then even if value will be sent back via webhooks, we can ignore it as check for exisiting row in db. It will be not possible comparing "id" or "external_id" as "id" is local index and "external_id" is id on integrated service. 

So, we can provide additional common for both services id of task. And then we will ignore response from webhook. 
Or we can update existing task in db and update it with "external_id" 