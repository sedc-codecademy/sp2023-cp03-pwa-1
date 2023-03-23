# Single Page Application

### What is a Single Page Application?

A single-page application (SPA) is a web application or website that interacts with the web browser by dynamically rewriting the current web page with new data from the webserver, instead of the default method of the browser loading entire new pages. The goal is faster transitions that make the website feel more like a native app.

In a SPA, all necessary HTML, JavaScript, and CSS code is either retrieved by the browser with a single page load, or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions. The page does not reload at any point in the process, nor does it transfer control to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.

### Single page application without using a framework

I've created a sample project, using the Bootstrap library. The project has a couple of pages, but only a single HTML file. The content in the HTML is being manipulated by JavaScript. The JavaScript file contains comments on each important line. These sample projects can be used as a template for student projects. The number of pages of course can be less or more, depending on the project requirements. The files are located here: https://github.com/sedc-codecademy/sp2020-tech-mentors/tree/master/single-page

### Single page application without using a framework, with dynamic content

The previous project is all good, but, the content is static, and to change the content you have to do coding. Applications usually depend on a bunch of API calls for dynamic data. There is a way to easily manipulate static content without using a framework, with simple vanilla Javascript. This is why, I created another folder, where the previous project is upgraded with dynamic content. The JSON call is faked because this is for testing purposes only. The carousel which is static in the previous project has been transferred to dynamic content by using a function that generates HTML, together with other helper functions that generate parts of the carousel. The JavaScript code has descriptive comments on all lines, that will help you understand this logic, and transfer your static content to dynamic. The files are located here: https://github.com/sedc-codecademy/sp2020-tech-mentors/tree/master/single-page-dynamic-content

I hope this helps you while developing the projects you are currently working on. Don't hesitate to contact me for more info, or suggestions on this topic.

Ivo Kostovski / ivo.kostovski@gmail.com
