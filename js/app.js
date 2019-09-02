'use strict'

// Variables
const cart = document.getElementById('cart')
const courses = document.getElementById('courses-list')
const courseList = document.querySelector('#cart-list tbody')
const emptyCartBtn = document.getElementById('empty-cart')

// Listeners
loadEventListeners()

function loadEventListeners() {
  // It works when you press the add button
  courses.addEventListener('click', buyCourse)

  // When a course is removed from the cart
  cart.addEventListener('click', deleteCourse)

  // Empty cart
  emptyCartBtn.addEventListener('click', emptyCart)
}


// Functions
// Function to add course to cart
function buyCourse(e) {
   e.preventDefault()
  //  Delegation to add to cart
   if(e.target.classList.contains('add-cart')) {
    const course = e.target.parentElement.parentElement
    // Send the selected course to send your data
    readDataCourse(course)
  }
}

// Read data course
function readDataCourse(course) {
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  addToCart(infoCourse)
}

// Show the selected course in the cart
function addToCart(course) {
  const row = document.createElement('tr')
  row.innerHTML = `
    <td>
      <img src="${course.image}" width=150>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td>
      <a href="#" class="delete-course" data-id="${course.id}">X</a>
    </td>
  `
  courseList.appendChild(row)
  saveCourseLocalStorage(course)
}

// Delete the course in the DOM
function deleteCourse(e) {
  e.preventDefault()
  
  let course
  if(e.target.classList.contains('delete-course')) {
    e.target.parentElement.parentElement.remove()
  }
}

// Empty cart courses at DOM
function emptyCart() {

  while(courseList.firstChild) {
    courseList.removeChild(courseList.firstChild)
  }
  return false
}

// Save courses in the local storage
function saveCourseLocalStorage(course) {
  let courses
  courses = getCoursesLocalStorage()

  // The selected course is added to the array
  courses.push(course)
  localStorage.setItem('courses', JSON.stringify(courses))
}

// Check for items in local storage
function getCoursesLocalStorage() {
  let coursesLocalStorage

  // Check if there is something in local storage
  if(localStorage.getItem('courses') === null) {
    coursesLocalStorage = []
  } else {
    coursesLocalStorage = JSON.parse(localStorage.getItem('courses'))
  }
  return coursesLocalStorage
  
}