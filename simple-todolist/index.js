/*
 * @Author: leo 
 * @Date: 2019-05-06 09:38:28 
 * @Last Modified by: leo
 * @Last Modified time: 2019-05-06 10:15:15
 */

(function() {
  // init data
  const todoList = []
  // init dom
  const addInput = document.querySelector('#add-input')
  const addBtn = document.querySelector('#add-btn')
  const content = document.querySelector('.content')
  const clear = document.querySelector('.clear-icon')
  /**
   * 核心方法，添加Todo
   */
  function addTodo(todo) {
    const html = `
      <div class="todo-item">
        <div class=""></div>
        <div class="todo-text">
          ${todo}
        </div>
        <div class=""></div>        
      </div>
    `
    let model = 'beforeend'
    content.insertAdjacentHTML(model, html)
  }

  function listenerHander() {
    const todo = addInput.value
    if (!todo) return
    addTodo(todo)
    addInput.value = ''
  }

  // add listener
  addBtn.addEventListener('click', function(e) {
    listenerHander()
  }, false)

  addInput.addEventListener('keyup', function(e) {
    if (e.keyCode !== 13) return 
    listenerHander()
  })
})(window, document)