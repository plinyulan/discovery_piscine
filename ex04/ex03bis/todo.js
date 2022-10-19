const handleNewTodo = () => {
    const text = prompt("Enter Your TO DO")
    if (text) {
        let parent = $("#ft_list")
        let newDiv = document.createElement("div")
        newDiv.className = "list"
        newDiv.appendChild(document.createTextNode(text))
        newDiv.addEventListener('click', handleDelete)
        parent.prepend(newDiv)
        insertTodo(text)
    }
}

const handleDelete = (e) => {
    if (confirm("Do you want to delete?")) {
        e.target.remove()
        deleteCookie(e)
    }
}

const deleteCookie = (e) => {
    let ls = document.cookie.match(/list=.+[^;]/g)[0]
    let todo = JSON.parse(ls.slice(5))
    todo = todo.filter(t => t != e.target.textContent)
    setCookie(todo)
}

const setCookie = (todo) => {
    let list = JSON.stringify(todo)
    document.cookie = `list=${list};path=/`
}

const insertTodo = (text) => {
    let todo = []
    if (document.cookie) {
        let ls = document.cookie.match(/list=.+[^;]/g)[0]
        todo = JSON.parse(ls.slice(5))
    }
    todo.push(text)
    setCookie(todo)
}

const handleLoad = () => {
    if (document.cookie) {
        let ls = document.cookie.match(/list=.+[^;]/g)[0]
        todo = JSON.parse(ls.slice(5))
        for (text of todo) {
            let parent = $("#ft_list")
            let newDiv = document.createElement("div")
            newDiv.className = "list"
            newDiv.appendChild(document.createTextNode(text))
            newDiv.addEventListener('click', handleDelete)
            parent.prepend(newDiv)
        }
    }
}