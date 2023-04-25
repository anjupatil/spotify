console.log("Welcome to Spotify")

let index=0
let audioElement=new Audio('audio/delicate.mp3')
let masterPlay=document.getElementById('masterPlay')
let myProgressBar= document.getElementById('myProgressBar')
let masterSongName=document.getElementById('masterSongName');
let gif=document.getElementById('gif')
let songItems=Array.from(document.getElementsByClassName('songItem'))



let songs=[
    {songName:"Delicate[Taylor Swift]",filepath:"audio/delicate.mp3", coverPath:"covers/delicate.png" , duration:"3:52"},
    {songName:"Burn[Ellie Goulding]",filepath:"audio/burn.mp3", coverPath:"covers/burn.jpg",duration:"3:51"},
    {songName:"Fight Song[Rachel Platten]",filepath:"audio/fightsong.mp3", coverPath:"covers/fight.png",duration:"3:25"},
    {songName:"Girls Like You[Maroon 5]",filepath:"audio/girlslikeyou.mp3", coverPath:"covers/girlslikeu.jpg",duration:"4:30"},
    {songName:"Lean On[Major Lazer]",filepath:"audio/leanon.mp3", coverPath:"covers/leanon.png",duration:"2:57"},
    {songName:"Love Me Like You Do[Ellie G]",filepath:"audio/lovemelikeyoudo.mp3", coverPath:"covers/lmlud.png",duration:"4:10"},
    {songName:"Stand By You[Rachel Platten]",filepath:"audio/standbyyou.mp3", coverPath:"covers/sby.png",duration:"3:59"},
    {songName:"Waving Flag[Knaan]",filepath:"audio/waving.mp3", coverPath:"covers/waving_flag.jpg",duration:"3:40"},
    {songName:"We Dont Talk[Charlie Puth]",filepath:"audio/wedonttalk.mp3", coverPath:"covers/wedonttalk.jpg",duration:"3:50"},
    

]

songItems.forEach((element,i)=>{
   
    
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
   


})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play()
        document.getElementById(`${index}`).classList.remove('fa-play')
        document.getElementById(`${index}`).classList.add('fa-pause')
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity=1
    }
    else{
        audioElement.pause()
        document.getElementById(`${index}`).classList.remove('fa-pause')
        document.getElementById(`${index}`).classList.add('fa-play')
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        gif.style.opacity=0

    }
})
audioElement.addEventListener('timeupdate',()=>{
     
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    
    myProgressBar.value=progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100
})

const makeAllPlays = (flag)=>{
    if(flag)
    {

        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        })
    }
    else{
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
        })

    }
}


var flag=0;
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
       
         console.log(e.target.id)
         index=parseInt(e.target.id);
         
         
         makeAllPlays(flag)
         if(e.target.classList.contains('fa-play')){
             flag=0;
             e.target.classList.remove('fa-play')
             e.target.classList.add('fa-pause')
             audioElement.src=`audio/${index}.mp3`
             masterSongName.innerText=songs[index].songName;
             audioElement.currentTime=0;
             audioElement.play()
             gif.style.opacity=1;
             masterPlay.classList.remove('fa-play')
             masterPlay.classList.add('fa-pause')
         }

         else{
            flag=1;
            makeAllPlays(flag)
            e.target.classList.remove('fa-pause')
             e.target.classList.add('fa-play')
             masterPlay.classList.remove('fa-pause')
             masterPlay.classList.add('fa-play')

             audioElement.pause();
             gif.style.opacity=0;
         }

        
    })
}) 



document.getElementById('next').addEventListener('click',()=>{
    if(index>=8){
        index=0;
    }
    else{
        index+=1
    }
    console.log(document.getElementById('next'))
    audioElement.src=`audio/${index}.mp3`
    masterSongName.innerText=songs[index].songName;
    audioElement.currentTime=0;
    audioElement.play()
   


    gif.style.opacity=1;
    makeAllPlays(1)
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    document.getElementById(`${index}`).classList.remove('fa-play')
    document.getElementById(`${index}`).classList.add('fa-pause')
    

})
document.getElementById('previous').addEventListener('click',()=>{
    if(index<=0){
        index=8;
    }
    else{
        index-=1
    }
    audioElement.src=`audio/${index}.mp3`
    masterSongName.innerText=songs[index].songName;
    audioElement.currentTime=0;
    audioElement.play()
    makeAllPlays(1)
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    document.getElementById(`${index}`).classList.remove('fa-play')
    document.getElementById(`${index}`).classList.add('fa-pause')
    

})






  
  // Add an event listener to the audio element to detect when the current song ends
  audioElement.addEventListener('ended', (e)=>{
    console.log(e)
    index = (index + 1) % songs.length; // update index to the next song, looping back to the start if necessary
  
    // Update the UI to reflect the new song
    console.log(index)
    makeAllPlays(1);
    audioElement.src = `audio/${index}.mp3`;
    

    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    console.log(document.getElementById(`${index}`).classList)
    document.getElementById(`${index}`).classList.remove('fa-play')
    document.getElementById(`${index}`).classList.add('fa-pause')
   


  });
  