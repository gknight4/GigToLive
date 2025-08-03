import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {Parser} from 'html-to-react'
// const HtmlToReactParser = require('html-to-react').Parser;// import NavBar from "./navbar.js"
import {cl,clLog,cl2,globs,navigate,
} from '../utils/utils.js'

function Menu1({parms}) {
//   cl(parms)
//   cl(parms)
//   const [email, setEmail] = useState("red");
//   cl2("and more")
//   cl2({a:"b"})
//   let lines=clLog.map((l,i)=>{
//     if(typeof l !="string"){l=JSON.stringify(l)}
//     return <span key={i}>{l}<br/></span>
//   })
//   var htmlToReactParser = new HtmlToReactParser();
  var menus={
    mainMenu:[
      {p:"Define your Profile, Search for Gigs, Create Contacts and Documents, Update Communications, and Follow your Calendar. Start with Profile."},
      {h:"Profile",
      hl:"Prof",
      p:"Who you are.",},
      {h:"Gigs",
      hl:"Gigs",
      p:"Work you're pursuing.",},
      {h:"Contacts",
      hl:"Cont",
      p:"Who you work with",},
      {h:"Documents",
      hl:"Doc",
      p:"What you've created and sent",},
      {h:"Communications",
      hl:"Comm",
      p:"What you've said to them",},
      {h:"Calendar",
      hl:"Cal",
      p:"What you have done and need to do",},
      {h:"Account",
      hl:"Account",
      p:"Login, Demo Mode, etc.",},
    ],
  gigMenu:[
    {p:"There are five steps that a gig goes through:"},
    {h:"Prospects",
    hl:"jobs",
    p:"This is where you accumulate all of the possible gigs. Search for Gigs, then sift through the Gigs list, and Tag the ones that you want to pursue. "},
    {h:"Tag",
    hl:"tag",
    p:"Prepares a Cover Letter and Resume created to pitch you to each particular Tagged Gig."},
    {h:"Apply",
    hl:"apply",
    p:"After the application has been made, schedule FollowUps by phone, text, or email to show that not only are you a good hire, but you care about getting hired."},
    {h:"Talk",
    hl:"talk",
    p:"Prepare for an Interview that will emphasize your strengths, minimize your weaknesses, and give you the right Questions to ask to convey that you're fully engaged in the process."},
    {h:"Go",
    hl:"go",
    p:"At this point, all you have to do is say, 'I'll take this one'."}
  ],
  gigs_jobs:[
    {p:"Search for available positions, and then Tag the ones you want to pursue. New positions are at the top of the list."},
    {h:"Search",
    hl:"search",
    p:"Use the information in your Profile to identify Job Descriptions, and then Search for current openings."},
    {h:"View",
    hl:"view",
    p:"Positions found."},
  ],
//   gigs_jobs:[
//     {p:"Search for available positions, and then Tag the ones you want to pursue."},
//     {h:"Search",
//     hl:"search",
//     p:"Use the information in your Profile to identify Job Descriptions, and then Search for current openings."},
//     {h:"New",
//     hl:"new",
//     p:"Positions found in the most recent search appear here."},
//     {h:"Old",
//     hl:"old",
//     p:"Untagged positions from previous searches are here, up to two weeks."},
//   ],
  gigs_tag:[
    {p:`A Cover Letter and Resume will be prepared to pitch you for \
"${parms.v0}". You can view, edit, and export them in a formatted form, ready for posting or emailing.`},
    {h:"Cover Letter",
    hl:"covLetter",},
    {h:"Resume",
    hl:"resume",},
  ],
  gigs_apply:[
    {p:`A week or so after applying, you should follow up. In your Calendar, a Follow Up event has been scheduled a week from now for "${parms.v0}" Call the main number, get through to HR, and make your case.`},
    {p:`<br/><h5>Some Advice</h5>
      <p><strong>Get past the Receptionist</strong>:<br/>

"Hi, this is ${parms.v2}. I’m following up on the application I submitted for the ${parms.v1} position that you advertised on Indeed. May I please speak with someone in Human Resources?"</p

<p><strong>Sound like you belong</strong>.<br/>Use a calm, confident tone. Avoid sounding uncertain or like you're fishing for information.
Be polite but assertive. Receptionists are gatekeepers. Say “please” and “thank you,” but be clear that you're not just asking for general info — you have a reason to speak with HR.<br/></p>

<h5>If You Don't Get Through</h5>

<p><strong>Offer to call back later</strong>.<br/> "Is there a better time when I could reach HR?"<br/></p>

<p><strong>Offer to leave a message</strong>. <br/>"Would you be able to take a message and let them know I’d be grateful for a call back regarding my application?"<br/></p>

<p><strong>Ask for an alternate contact</strong>. <br/>"Is there someone else in the HR department I could speak with?"</p>

<p><strong>Ask for a direct number</strong>. <br/>"Is there a direct number that I can use to reach HR?"</p>

<h5>When You Do Get Through To HR</h5>

“I wanted to follow up and express my continued interest in the ${parms.v1} position. I’m excited about the opportunity and would be happy to provide any additional information that might be helpful.”</p>

<h5>Ask Simple, Professional Questions</h5>

<p><strong>To Confirm Your Application Was Received</strong>: <br/>“I wanted to confirm that my application for the ${parms.v1} position was received and complete — is there anything else you need from me?”</p>

<p><strong>To Show Engagement and Initiative</strong>: <br/>“Could you tell me more about the timeline for the hiring process?” “Also, I’d love to know what qualities or experience you’re hoping to see in the ideal candidate for this role.”</p>

<p><strong>You're interested in a long-term fit</strong>: <br/>"Is there anything about the company culture I should know as a candidate?"</p>

<p><strong>To Express Availability</strong>: <br/>“If it’s helpful, I’d be happy to make myself available for an interview at your convenience.” “I’m very interested in this role and would love the opportunity to speak further.”</p>

<p><strong>If they seem open, you can also ask</strong>: <br/>“Is there anything in my application you'd like me to expand on or clarify?”</p>

<p><strong>Close Politely</strong>
<br/>“Thank you so much for your time. I really appreciate the chance to follow up and I hope to hear from you soon.”</p>`}
],
  gigs_talk:[
    {p:`For the Interview, you have to be ready to talk about the company, the industry, the position, your experience, your strengths and weaknesses, your goals, and you have to be ready to Ask Questions!`},
    {h:"The Company",
    hl:"Company"},
    {h:"The Industry",
    hl:"Industry"},
    {h:"The Position",
    hl:"Position"},
    {h:"Your Experience",
    hl:"Experience"},
    {h:"Your Strengths",
    hl:"Strengths"},
    {h:"Your Weaknesses",
    hl:"Weaknesses"},
    {h:"Your Goals",
    hl:"Goals"},
    {h:"Sample Questions",
    hl:"Sample_Questions"},
    {h:"Your Questions",
    hl:"Your_Questions"},
    ],



// "Can I provide any additional information to support my application?"
// Shows you're proactive and willing to help the process move forward.
//
// "Could you share what the next steps look like for this position?"
// Demonstrates your interest in the hiring timeline and process.
//
// "What qualities are you hoping to see in the ideal candidate?"
// Gives you a chance to reinforce how you match those qualities in future communication or interviews.
//
// "Is there anything in my background you’d like me to clarify?"
// Signals openness and confidence, while giving them a reason to re-engage.
//
// "How does this role contribute to the team or company’s larger goals?"
// Shows strategic thinking and genuine interest in the company's mission.
//
// "Is there anything about the company culture I should know as a candidate?"
// Signals that you’re thinking about long-term fit, not just landing the job.
//
// "I’m very excited about this role—could we schedule a time to talk further?"
// A bold but respectful ask that shows readiness and initiative.


  res_style:[
    {h:"Traditional / Chronological",
    hl:"Chrono",
    p:"The Tone is clean, structured, conventional. Use when you have a solid work history and want to emphasize career progression. Lists work experience in reverse chronological order, with clear sections for education, skills, and achievements.",},
    {h:"Modern / Clean",
    hl:"Clean",
    p:"The Tone is minimalist, visually balanced. Use when you want to stand out with design while staying professional. Light color accents, icons, strong typography, clear hierarchy.",},
    {h:"Functional / Skills-Based",
    hl:"Skills",
    p:"The Tone is strategic, skill-forward. Use when you’re changing industries or have gaps in employment. Organizes resume by core skills and accomplishments rather than by job title.",},
    {h:"Bold / Visual",
    hl:"Bold",
    p:"The Tone is expressive, attention-grabbing. Use when applying to design, content, or creative roles. Includes infographics, color, custom fonts, and possibly a photo or personal logo.",},
    {h:"Hybrid / Mixed",
    hl:"Mixed",
    p:"The Tone is balanced, flexible. Use when you want to show both skills and work experience with equal weight. Combines skills-based and chronological formats; highlights a summary, followed by relevant achievements and roles.",},
    {h:"Narrative / Personal Brand-Focused",
    hl:"Story",
    p:"The Tone is engaging, story-driven. Use when you want to show personality and unique value proposition. Includes a personal summary, core values, achievements framed as stories or themes.",},
  ],
  cov_style:[
    {h:"Professional & Formal",
    hl:"Formal",
    p:"The Tone is polished, respectful, classic. Use when applying to corporate roles, finance, law, or traditional industries. Clear structure, conservative language, emphasizes credentials and fit.",},
    {h:"Friendly & Conversational",
    hl:"Nice",
    p:"The Tone is warm, human, approachable. Use when applying to startups, nonprofits, or people-first companies. Personal voice, storytelling, subtle professionalism.",},
    {h:"Creative & Bold",
    hl:"Bold",
    p:"The Tone is expressive, attention-grabbing, original. Use when applying to design, media, or creative roles. Unconventional opening, visual formatting, showcases creative voice.",},
    {h:"Amped & Mission-Driven",
    hl:"Amped",
    p:"The Tone is heartfelt, value-based. Use when applying to organizations with a clear mission (education, sustainability, healthcare). Focus on values, purpose, personal connection to the work.",},
    {h:"Straightforward & Results-Oriented",
    hl:"Direct",
    p:"The Tone is direct, efficient, professional. Use when applying to roles in operations, tech, logistics, sales. Emphasizes outcomes, quantifies achievements, avoids fluff.",},
    {h:"Narrative or Storytelling-Based",
    hl:"Story",
    p:"The Tone is engaging, reflective, personal. Use when highlighting a career shift, unique journey, or unconventional experience. Starts with a story or insight, connects it to the role.",},
  ],
  covLetter:[
    {h:"Edit",
    hl:"edit",
    p:"Choose a style, and edit the results.",},
    {h:"View",
    hl:"view",
    p:"Shows an image of the final pages",},
    {h:"Download",
    hl:"down",
    p:"Save a copy of the final product locally.",},
    {h:"Email",
    hl:"email",
    p:"Send a copy to yourself.",},
  ],
  profile:[
    {p:"Your Profile is the most important part of the process. The better that you can describe who you are, what you've done, and what you want, the better AI will do in A) Finding you a gig, and B) Presenting you in a way that you're likely to get it. There are a number of sections to express yourself. Some may seem overlapping, but the more completely you can answer the prompts, the better the system will work. Note the microphone! You can speak these sections, and then edit them."},
    {h:"Basics",
    hl:"basic",
    p:"Name, Address, Schooling, Work Status, Interests, etc.",},
    {h:"Identity",
    hl:"identity",
    p:"Who are you, what have you done, what have you learned?",},
    {h:"Skills",
    hl:"skills",
    p:"What can you do, and what do you use to do it?",},
    {h:"Goals",
    hl:"goals",
    p:"What are your goals for your work? What work satisfies you, and what annoys you?",},
    {h:"Vision",
    hl:"vision",
    p:"What are your goals for yourself, long term? Where do you want to be 20 years from now?",},
  ],
  prof_identity:[
    {h:"Self",
    hl:"self",
    p:"Who you are."},
    {h:"Work",
    hl:"work",
    p:"What you do."},
    {h:"School",
    hl:"school",
    p:"What you've learned."},
    {h:"Skills",
    hl:"skills",
    p:"What you can do."},
    {h:"Style",
    hl:"style",
    p:"How you live."},
    {h:"Values",
    hl:"values",
    p:"What you care about."},
  ],
  prof_skills:[
    {h:"Work",
    hl:"work",
    p:"What kind of work are you doing now."},
    {h:"Services",
    hl:"services",
    p:"What services do you offer."},
    {h:"Tools",
    hl:"tools",
    p:"What tools do you use."},
    {h:"Clients",
    hl:"clients",
    p:"Who do you work for and with."},
    {h:"Style",
    hl:"style",
    p:"How do you approach your work."},
  ],
  prof_goals:[
    {h:"Work",
    hl:"work",
    p:"What do you want to do."},
    {h:"Field",
    hl:"field",
    p:"What fields are you drawn to."},
    {h:"Culture",
    hl:"culture",
    p:"What vibe are you seeking."},
    {h:"Income",
    hl:"income",
    p:"How do you measure success."},
    {h:"Deal Breakers",
    hl:"dealBreakers",
    p:"What are the musts and must nots."},
  ],
  prof_vision:[
    {h:"Self",
    hl:"self",
    p:"What world do you want to live in."},
    {h:"Learn",
    hl:"learn",
    p:"How do you want to grow"},
    {h:"Roles",
    hl:"roles",
    p:"Who do you want to be."},
    {h:"Legacy",
    hl:"legacy",
    p:"How do you want to be remembered."},
    {h:"Changes",
    hl:"changes",
    p:"How do you want to be different."},
  ],
  careerState:[
    {h:"Curiosity",
    hl:"Curiosity",
    p:"A spark of interest draws you toward something meaningful, new.",},
    {h:"Exposure",
    hl:"Exposure",
    p:"You explore tools, stories, and skills that shape the field.",},
    {h:"Foundation",
    hl:"Foundation",
    p:"You build basic skills, language, and habits through guided learning.",},
    {h:"Experimentation",
    hl:"Experimentation",
    p:"You try, fail, and adapt while learning from your mistakes.",},
    {h:"Commitment",
    hl:"Commitment",
    p:"You decide this path matters and invest your time intentionally.",},
    {h:"Competence",
    hl:"Competence",
    p:"Your skills become reliable; others begin to recognize your ability.",},
    {h:"Style",
    hl:"Style",
    p:"You develop a voice, approach, or workflow that feels authentic.",},
    {h:"Contribution",
    hl:"Contribution",
    p:"You share knowledge, collaborate, and begin teaching what you've learned.",},
    {h:"Mastery",
    hl:"Mastery",
    p:"You work with confidence, solve complex problems, and inspire others.",},
    {h:"Evolution",
    hl:"Evolution",
    p:"You grow beyond mastery, adapt, pivot, or mentor the next.",},
  ],
  account:[
    {h:"Login",
    hl:"/Login",
    p:"Login / Register",},
  ],
  contacts:[
    {h:"Import",
    hl:"/Login",
    p:"Login / Register",},
  ],


  }

  var smOnClick=(link)=>{
    if(parms.cb){
//       cl(menus[parms.menu])
      let item=(menus[parms.menu]||[]).filter(m=>{return m.hl==link})[0]
//       cl(item)
      return parms.cb({
        link:link,item:item}
      )

    }
    navigate(link)
  }


  var showMenu=(menu)=>{
//     cl(parms)
    var oc=(e)=>{return x=>smOnClick(e)}
    var parse = new Parser();
//     cl(menu)
    let parts=menu.map((m,i)=>{
//       cl(m)
      let pEl=parse.parse(m.p);
//       cl(pEl)
      return(
        <div key={i}>
        {m.h&&<h3 className="smHead" onClick={oc(m.hl)}>{m.h}</h3>}
        {pEl}
        </div>
      )
    })
    return(
      <div>{parts}</div>
    )
  }

//   cl(parms.dynMenu)
//   cl(parms)
  return (
    <div className="App">
      <div style={{backgroundColor:"white",textAlign:"left",
        overflowY:"auto",padding:20,
      }}>
      {showMenu(parms.dynMenu||menus[parms.menu])}
      </div>
    </div>
  );
}

export default Menu1
