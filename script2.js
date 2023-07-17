
var firebaseConfig = {
    apiKey: "AIzaSyCIoweMPnjQTF7pvdduJkzqKxA1kfvWpA8",
    authDomain: "teeth-upload.firebaseapp.com",
    databaseURL: "https://teeth-upload-default-rtdb.firebaseio.com",
    projectId: "teeth-upload",
    storageBucket: "teeth-upload.appspot.com",
    messagingSenderId: "886548923374",
    appId: "1:886548923374:web:bb5d47424602f7287104ff",
    measurementId: "G-6E14XXKLR6"
  };
  firebase.initializeApp(firebaseConfig);



var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress =  document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
 function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}


function uploadImage(){

    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);


    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error is ", error);
    },()=>{

        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL", url);

            if(url != ""){
                img.setAttribute("src",url);
                img.style.display="block";
            }


        })


    })
    
    
}