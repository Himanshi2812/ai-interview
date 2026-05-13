
"use client"

import {useState,useRef,useEffect} from "react"
import {generateQuestions,evaluateAnswers} from "@/actions/video-interview"
import { Mic, Square, Video, Wand2 } from "lucide-react"

export default function Page(){

const videoRef=useRef(null)
const recognitionRef=useRef(null)

const[questions,setQuestions]=useState([])
const[current,setCurrent]=useState(0)
const[answer,setAnswer]=useState("")
const[answers,setAnswers]=useState([])
const[started,setStarted]=useState(false)
const[result,setResult]=useState(null)


// CAMERA
useEffect(()=>{

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
if(videoRef.current){
videoRef.current.srcObject=stream
}
})

},[])


// SPEECH RECOGNITION
useEffect(()=>{

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition

if(SpeechRecognition){

const recognition = new SpeechRecognition()

recognition.lang="en-US"

recognition.onresult=(event)=>{

const transcript=event.results[0][0].transcript
setAnswer(transcript)

}

recognitionRef.current=recognition

}

},[])


// AI VOICE QUESTION
useEffect(()=>{

if(questions.length>0){

const q=questions[current]

if(q){

const speech=new SpeechSynthesisUtterance(q)
speech.lang="en-US"

window.speechSynthesis.speak(speech)

}

}

},[current,questions])


// START RECORDING
function startRecording(){

recognitionRef.current?.start()

}


// STOP RECORDING
function stopRecording(){

recognitionRef.current?.stop()

setTimeout(()=>{

// save answer
const updated=[...answers,answer]
setAnswers(updated)
setAnswer("")

// more questions
if(current+1 < questions.length){

const speech=new SpeechSynthesisUtterance("Next question")
speech.lang="en-US"
window.speechSynthesis.speak(speech)

setTimeout(()=>{
setCurrent(current+1)
},1200)

}
else{

finishInterview(updated)

}

},500)

}


// START INTERVIEW
async function startInterview(){

const qs = await generateQuestions()

// ensure array
if(Array.isArray(qs)){
setQuestions(qs)
}
else{
setQuestions([qs])
}

setStarted(true)

}


// FINISH INTERVIEW
async function finishInterview(updatedAnswers){

stopCamera()

// remove empty answers
const data=questions
.map((q,i)=>({
question:q,
answer:updatedAnswers[i]
}))
.filter(item=>item.answer && item.answer.trim()!=="")

const evaluation = await evaluateAnswers(data)

setResult(evaluation)

}


// STOP CAMERA
function stopCamera(){

const stream=videoRef.current?.srcObject

if(stream){
stream.getTracks().forEach(track=>track.stop())
}

}


// RESULT PAGE
if(result){

return(

<div className="flex min-h-[72vh] items-center justify-center">

<div className="surface-panel w-full max-w-3xl rounded-lg p-6 sm:p-8">

<h1 className="text-3xl font-bold mb-4 text-center">
Interview Result
</h1>

<p className="text-xl text-center mb-4 text-primary">
Score: {result.score}/10
</p>

<p className="text-muted-foreground text-center mb-6">
{result.feedback}
</p>

<div className="border-t border-border/70 pt-4">

<h3 className="font-semibold mb-3 text-lg">
Your Answers
</h3>

{answers.map((a,i)=>(
<div key={i} className="mb-4">

<p className="font-medium text-foreground">
Q{i+1}: {questions[i]}
</p>

<p className="text-muted-foreground">
Your Answer: {a || "No answer given"}
</p>

</div>
))}

</div>

</div>

</div>

)

}


// INTERVIEW PAGE
return(

<div className="flex min-h-[72vh] items-center justify-center">

<div className="surface-panel w-full max-w-3xl rounded-lg p-5 sm:p-8">

<div className="mb-6 text-center">
<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
<Video className="h-6 w-6" />
</div>
<h1 className="text-3xl font-bold">
AI Video Interview
</h1>
</div>

<video
ref={videoRef}
autoPlay
playsInline
className="mb-6 aspect-video w-full rounded-lg border border-border/80 bg-black object-cover shadow-sm"
/>

{!started&&(

<button
onClick={startInterview}
className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90"
>
<Wand2 className="h-4 w-4" />
Start Interview
</button>

)}

{started&&!result&&(

<div>

<div className="bg-card/65 border border-border/80 rounded-lg p-4 mb-4">

<h2 className="font-semibold text-lg mb-2">
Question {current+1} / {questions.length}
</h2>

<p className="text-muted-foreground">
{questions[current]}
</p>

</div>

<textarea
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Speak or type your answer..."
className="mb-4 min-h-28 w-full rounded-lg border border-input bg-secondary/65 p-3 text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/25"
/>

<div className="flex gap-3 flex-wrap">

<button
onClick={startRecording}
className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
>
<Mic className="h-4 w-4" />
Start Recording
</button>

<button
onClick={stopRecording}
className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border/80 bg-secondary/85 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
>
<Square className="h-4 w-4" />
Stop Recording
</button>

</div>

</div>

)}

</div>

</div>

)

}
