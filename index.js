//FireBase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ac160-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsListInDB = ref(database, "comments")
//


const commentBox = document.querySelector('textarea')
const sender = document.getElementById('sender')
const receiver = document.getElementById('receiver')
const publishBtn = document.querySelector('.publish-btn')
const comments = document.getElementById('comments')

let writtenComment = commentBox.value 
let fromName = sender.value
let toName = receiver.value


publishBtn.addEventListener('click', publish)

onValue(commentsListInDB, snapshot => {
    if(snapshot.exists()) {
        const commentsArr = Object.entries(snapshot.val())
        createComment(commentsArr)
    }
})

function publish() {
    writtenComment = commentBox.value 
    fromName = sender.value
    toName = receiver.value
    if (writtenComment && fromName && toName) {
        push(commentsListInDB, {comment: writtenComment, sender: fromName, receiver: toName, isLiked: false})
        emptyFields()
    } else {
        alert('complete all the fields')
    }
}


function createComment(arr) {
    comments.innerHTML = ''
    
    arr.forEach(comm => {
        const newCommentDiv = document.createElement('div')
        newCommentDiv.setAttribute('id', 'comment-div')
        const comment = document.createElement('p')
        comment.setAttribute('id', 'comment')
        const senderName = document.createElement('p')
        senderName.setAttribute('class', 'name')
        const receiverName = document.createElement('p')
        receiverName.setAttribute('class', 'name')
        const likebtn = document.createElement('p')
        
        
        const commentObj = comm[1]
        const commentID = comm[0]
        
        let likeClass = commentObj.isLiked ? 'solid' : 'regular'
        likebtn.innerHTML = `<i class="fa-${likeClass} fa-heart"></i>`
        
        likebtn.addEventListener('click', () => {
            commentObj.isLiked = !commentObj.isLiked
            createComment(arr)
            
        })
       
        comment.textContent = commentObj.comment
        senderName.textContent = 'From ' + commentObj.sender
        receiverName.textContent = 'To ' + commentObj.receiver
        
        newCommentDiv.appendChild(senderName)
        newCommentDiv.appendChild(comment)
        newCommentDiv.appendChild(receiverName)
        newCommentDiv.appendChild(likebtn)
        
        comments.appendChild(newCommentDiv)
        
    })
    

    
    
       
}

function emptyFields() {
    commentBox.value = '' 
    sender.value = ''
    receiver.value = ''
}

function Halndlelike (bool) {
    bool = !bool
    console.log(bool)
    
}