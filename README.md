# Job-application-tracker
<h1>Question and Answer</h1> 
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

    Answer:  getElementById("title")  selects one element by id, getElementsByClassName("box")  selects all elements with class "box" (live collection), querySelector(".box")  selects the first element matching the CSS selector, and  querySelectorAll(".box")  selects all matching elements (static list).

2. How do you create and insert a new element into the DOM?

    Answer: To create and insert a new element into the DOM, I first use document.createElement() to create the element, then I add content   or attributes to it, and finally I insert it into the page using methods like appendChild() or append().
  Example: let newDiv = document.createElement("div");
           newDiv.textContent = "Hello World";
           document.body.appendChild(newDiv);

3. What is Event Bubbling? And how does it work?     
   Answer: Event Bubbling is when I click on a child element and the event first runs on that element, then automatically moves up to its
          parent elements in the DOM; for example, if I click a button inside a div, the click event triggers on the button first and then on the div.

4. What is Event Delegation in JavaScript? Why is it useful?

    Answer: Event Delegation is when I put a single event listener on a parent to handle events for its children, which saves memory and     works for dynamic elements; for example, I can listen for clicks on a parent div and detect which child button was clicked.

    Example:   document.getElementById("parent").addEventListener("click", function(e) {
    if(e.target.classList.contains("child")) {
        console.log("Child clicked:", e.target.textContent);
        }
    });

5. What is the difference between preventDefault() and stopPropagation() methods?
   
   Answer : I use preventDefault() to stop the browser’s default action, and stopPropagation() to stop the event from bubbling to parent elements; for example, I can prevent a link from opening and stop a child click from reaching the parent.

      Example: document.querySelector("a").addEventListener("click", e => e.preventDefault());
               document.querySelector(".child").addEventListener("click", e => e.stopPropagation());


## Features

- Dashboard showing total, interview, and rejected job counts.
- List of job applications with company, role, location, salary, and status.
- Buttons to mark jobs as Interview or Rejected.
- Delete jobs from the list.
- Real-time updates and filtering by status.

## Technologies Used

- HTML, CSS, Tailwind, JavaScript               


