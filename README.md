# cs103a-cpa02
<h2> Zoom Link </h2>
https://brandeis.zoom.us/rec/share/cPo8Z4DpKU2nC39rk1K6h-YiN605tgcAiLhUhAvhqnYkpEGSdtWLBkw_astTzpUA._K6gQxl4oWJpcUk4?startTime=1650899882000 
 
<h2>Description</h2>:
The main function of this app is to help student generate their first resume. At the main page, they can choose if they want to get one resume or get tips of how to write resume:
![9df7cecb16964c15231ab3d6df506d2](https://user-images.githubusercontent.com/62361017/165009101-7af8556b-10f0-4e2e-b540-b2c8bd2b13f4.png)

As it shown above, if the user clicks the right part, it will direct the user to Brandeis Hiatt Career Center with Resume Template. If the user clicks the left part, it will direct the user to the actual app. 

![5ea53c08c0ff0ed526de08e140cc43e](https://user-images.githubusercontent.com/62361017/165107949-5419f5ce-0577-46ae-9d3f-bd7c5d661720.png)

The app looks like this. (The google login is temporarily unavailable) The user would need to sign up for an account. If the username exists, it would ask the user to change one. After signing up, it will direct the user back to the main page. The user now can go back to login page agin and use the login box to enter their account.

![2a6f3dd3a20d6af3d842b778c0ff943](https://user-images.githubusercontent.com/62361017/165108418-f84ce72e-e227-4676-bb4d-f7e625330d78.png)

After Clicking submit, it will direct the user to a page where the user can enter their resume information:

![e49ac4af16d494b8b3086eb5b6e4a0b](https://user-images.githubusercontent.com/62361017/165108497-2453651c-d5f4-469a-9c47-8aa030c4acb0.png)

After filling out all the necessary information, it will automatically generate a resume for the user based on the input information:

![26efc60bfd705007e6277f58c03e42e](https://user-images.githubusercontent.com/62361017/165108695-514ff44a-1785-43ab-8766-6dc35217d2bb.png)

There is another Administrator account stored in Mongodb that has access to check other people's resume based on input information.

![88442c46177dc4736e6a857cfab59d1](https://user-images.githubusercontent.com/62361017/165111678-4156e607-7cc3-4c9d-8482-6936dcfc0740.png)

Here, the Administrator can find other people's data (in json format):

![6163d3a974f03871e06e999a9c362dd](https://user-images.githubusercontent.com/62361017/165111826-4d13b4ec-c4cc-41ca-ae5b-2c18d1c043b3.png)

Then after entering name/school/major, the corresponding person(s) will appear, for example, if I enter "Gordon Dou" at here, who is an user in the database:

![1650897586(1)](https://user-images.githubusercontent.com/62361017/165112393-1b5b6fbf-d7c3-4938-9d8d-bb38b944a17f.png)

It will then redirect to the information page of the person (in this case, the person did not enter any information for his experrence because it is not required:

![1650897653(1)](https://user-images.githubusercontent.com/62361017/165112583-3ecf96f9-e836-40ea-a439-a5ea2652aa6d.png)

<h2> Installation </h2>
Download the project from https://github.com/franciscoliu/cs103a-cpa02 and download nodejs and npm from https://nodejs.org
and cd into the folder

Install the packages with
``` bash
npm install
```
Start the project with
``` bash
node app.js
```
or install nodemon (the node monitoring app) with
``` bash
npm install -g nodemon
```
and start the project with
``` bash
nodemon app.js
```
If there is any necessary packages to download, please use the following command to download:
```bash
npm install -g [required package]
```


  
