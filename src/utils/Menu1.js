import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import NavBar from "./navbar.js"
import {cl,clLog,cl2,globs,navigate,
} from '../utils/utils.js'

function Menu1({parms}) {
//   cl(parms)
//   const [email, setEmail] = useState("red");
//   cl2("and more")
//   cl2({a:"b"})
//   let lines=clLog.map((l,i)=>{
//     if(typeof l !="string"){l=JSON.stringify(l)}
//     return <span key={i}>{l}<br/></span>
//   })
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
    {h:"Gigs",
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
    {p:"Search for available positions, and then Tag the ones you want to pursue."},
    {h:"Search",
    hl:"search",
    p:"Use the information in your Profile to identify Job Descriptions, and then Search for current openings."},
    {h:"New",
    hl:"new",
    p:"Positions found in the most recent search appear here."},
    {h:"Old",
    hl:"old",
    p:"Untagged positions from previous searches are here, up to two weeks."},
  ],
  gigs_jobs:[
    {p:"Search for available positions, and then Tag the ones you want to pursue."},
    {h:"Search",
    hl:"search",
    p:"Use the information in your Profile to identify Job Descriptions, and then Search for current openings."},
    {h:"New",
    hl:"new",
    p:"Positions found in the most recent search appear here."},
    {h:"Old",
    hl:"old",
    p:"Untagged positions from previous searches are here, up to two weeks."},
  ],
  gigs_tag:[
    {p:`A Cover Letter and Resume have been prepared to pitch you for \
"${parms.v0}". You can view, edit, and export them in a formatted form, ready for posting or emailing.`},
    {h:"Cover Letter",
    hl:"covLetter",},
    {h:"Resume",
    hl:"resume",},
  ],

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
//       cl(parms.menu)
      let item=menus[parms.menu].filter(m=>{return m.hl==link})[0]
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
    let parts=menu.map((m,i)=>{
      return(
        <div key={i}>
        {m.h&&<h3 className="smHead" onClick={oc(m.hl)}>{m.h}</h3>}
        {m.p&&<p>{m.p}</p>}
        </div>
      )
    })
    return(
      <div>{parts}</div>
    )
  }

  return (
    <div className="App">
      <div style={{backgroundColor:"white",textAlign:"left",
        overflowY:"auto",padding:20,
      }}>
      {showMenu(menus[parms.menu])}
      </div>
    </div>
  );
}

export default Menu1
