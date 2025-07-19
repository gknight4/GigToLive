var julesAvery={
  name:"Jules Avery",
  age:20,
  city:"Austin",
  state: "TX",
  school:"college",
  work:"freelance",
  interests:["content","photo","write","music","social"],
  strengths:["comm","creative","curious","thinking"],
  pTraits:["creative","curious","empathetic","observe","depend"],
  nTraits:["introvert","support","independent","analytic","cautious"],
  jobTitles:[{t:"Retail Associate",e:1},{t:"Warehouse Associate",e:0}],
  identity:{
    self:"I’m Jules. I live in Austin with my rescue dog, Pepper. I split my time between audio work and a cozy indie bookstore. I’m happiest when I’m making something — whether it’s a podcast episode, a playlist, or a playlist for a podcast episode.",
    work:"I started out editing interviews for a friend’s podcast, then slowly picked up more freelance clients. I’ve produced shows for nonprofits, educators, and indie authors. Before that, I worked retail, waited tables, and even ran a pop-up poetry booth. Every job taught me how to listen better.",
    school:"I have a bachelor’s in English, plus a ton of self-taught skills from YouTube, Reddit, and trial-by-fire. I took online courses in audio engineering, marketing for creatives, and storytelling. I’ve also attended a couple of podcasting conferences that really helped me level up.",
    skills:"I’m good at hearing what matters — literally and emotionally. I can cut through a two-hour conversation and find the heart of it. I’m calm under pressure, organized with files, and kind in my feedback. People tell me I create a safe, curious space in both editing and conversation.",
    style:"I’m focused, self-driven, and quietly collaborative. I like having space to work things out but love checking in with smart people. I keep clean systems for chaotic projects. I’m a night owl by nature and a problem-solver by instinct. I listen more than I speak — but I’ll ask questions.",
    values:"I believe stories shape how people see the world — and how they see themselves. I value honesty, gentleness, and showing up even when it’s messy. I care more about real impact than reach. My work is guided by a mix of curiosity, empathy, and finding joy in the details.",
  },
  skills:{
    work:"I freelance as a podcast producer — mostly editing, mixing, and writing episode descriptions. I also co-host a quiet culture show about small joys and big feelings. When I’m not doing audio, I work part-time at a local bookstore shelving poetry and curating staff picks with way too much care.",
    services:"I offer podcast editing, production, show formatting, sound cleanup, and episode planning. I also help with naming, scripting, and content direction. Some clients just send audio and say “make it better,” others want full collaboration. I also create custom podcast intros with royalty-free music and voiceover if needed.",
    tools:"I primarily use Reaper, Descript, and iZotope RX for audio work. Google Drive and Notion keep me organized. I publish shows through Libsyn and Buzzsprout. For communication, I prefer Slack or email — but I’ll do Zoom when needed. My tech stack is simple, reliable, and low-drama.",
    clients:"Most of my clients are indie creators, small nonprofits, educators, or niche storytellers. I’ve worked with therapists, historians, and people who want to record memoirs. I like working with people who care deeply about their message, even if they’re new to podcasting or nervous about their voice.",
    style:"I work quietly and carefully. I like to understand a client’s tone and shape the show around it. I aim for clarity, warmth, and emotional flow. I’m not flashy — I make it feel natural. I ask good questions early so we can avoid chaos later. No ego, just presence."
  },
  goals:{
    work:"Freelance or part-time project work is ideal — especially audio storytelling, interviews, or quiet creative consulting. I like having a few clients at once, with room for personal projects. I’m not chasing full-time unless it’s deeply aligned. Flexibility and creative control matter more than hours or titles.",
    field:"Podcasting, publishing, education, and indie media are my home base. I’d love to work more in mental health, museums, or environmental storytelling. I gravitate toward fields where people care about meaning over metrics — where curiosity and compassion are part of the job, not just the outcome.",
    culture:"I do best in calm, respectful environments where people communicate clearly and treat each other like humans. I value gentle feedback, thoughtful pacing, and real collaboration. Give me autonomy, trust, and the ability to set my hours — I’ll give you quality, kindness, and consistency.",
    income:"I want to earn enough to live simply and support my creative work without burnout. A consistent baseline matters more than big spikes. I value stability, ethical clients, and room to grow. Eventually, I’d like to package some of my knowledge — courses, templates, maybe a book.",
    dealBreakers:"Dealbreakers: loud egos, tight turnaround chaos, no credit for creative work, or anything that exploits others. Must-haves: clear communication, fair pay, flexible hours, and work that feels like it adds something to the world. I don’t need applause — but I do need mutual respect.",
  },
  vision:{
    self:"I want to be someone whose work feels like a conversation — not just content. I imagine myself living simply, creating steadily, and mentoring others who feel a little unsure, like I did. I want to be calm, capable, and still curious, with a voice people trust.",
    skills:"I want to get better at sound design, scripting narrative podcasts, and coaching new hosts. I’d like to learn basic motion graphics, more efficient workflows, and how to build digital products. Also: how to market myself without cringing. That one might take longer.",
    roles:"Creative producer. Thoughtful collaborator. Voice coach. Quiet leader. Maybe studio owner, someday — not big, but intentional. I don’t need to be “the name” behind something, but I want to be part of the spark that makes other people’s ideas real, beautiful, and heard.",
    legacy:"I’d love to leave behind stories that helped people feel seen or softened. Maybe someone listens to an episode years from now and thinks, “That felt honest.” I hope I teach others to trust their voice — even if it shakes — and that craft doesn’t have to come with cruelty.",
    changes:"I want to trust my instincts more. To say no without guilt. To stop shrinking when something good happens. I want to feel like I’m allowed to take up space — not just in my work, but in my own head. Becoming that version of me feels worth working toward.",
  }
}

var prompts={
  identity:{
    self:"Tell me your name, where you live, and whether you're open to remote work or moving somewhere new. Are you in school, taking a break, or working part-time? Anything else going on in your life that affects how much you can work right now?",
    work:"What kind of work have you done so far? Tell me about your part-time jobs, side gigs, or anything you've helped with — even volunteer stuff. What kind of work came naturally to you, and what did people say you were good at?",
    school:"Are you in school, or have you taken any courses that matter to you? What have you learned on your own — like through YouTube, trial and error, or asking questions? Even if it’s not from a classroom, your learning experience helps shape where you can go next.",
    skills:"What do you do well? Maybe it’s fixing things, writing, listening, organizing, or making people laugh. What skills do people notice about you, or ask for help with? This is about the things you’re naturally good at or skills you’ve started to build and want to improve.",
    style:"How do you like to work? Fast and independent? Hands-on with a team? Do you enjoy helping people, solving problems, or learning new stuff? Think about what makes you feel good when you’re working — that’s usually a clue to where you’ll thrive.",
    values:"What matters to you? It could be honesty, creativity, freedom, helping others, or just becoming better than you were last year. Is there a quote or mindset you try to live by? Knowing your values helps make sure you find work that feels right — not just pays right.",
  },
  skills:{
    work:"What are you doing now to earn money or build skills? Tell me about your part-time job, any side hustles, creative projects, or ways you spend your time. Even small experiences matter — it all helps figure out where you’re starting from and what you’re already capable of.",
    services:"What could someone hire you for right now? Think about things you already know how to do — like working with your hands, social media, helping people, fixing stuff, or being dependable. What do you already know well enough to offer as a service or skill?",
    tools:"What apps, tools, or gear do you use confidently? That could be TikTok, Canva, Excel, Google Docs, POS systems, power tools, or a gaming PC you’ve built. Even casual tools matter. This helps identify jobs or gigs that use what you’re already good with.",
    clients:"Who do you like helping or working with? That could be older people, kids, small businesses, content creators, students, or just your local community. Who do you “get” — and who gets you? Knowing your ideal audience helps find work where you connect naturally.",
    style:"How do you like to get things done? Do you jump in and figure it out as you go? Plan everything first? Learn by doing? Stick with things even when they’re hard? Describe how you work when you're at your best — that’s part of your personal brand."
  },
  goals:{
    work:"What kind of work are you hoping to find? Something steady? Something creative? Something remote or in-person? Would you prefer a job, a gig, or your own hustle? Knowing how much time you want to give — and what kind of structure works best — helps find the right fit.",
    field:"What kinds of jobs or industries sound exciting to you? Could be tech, design, video, fitness, cars, fashion, or something you’re just curious about. You don’t need experience — just interest. This helps point toward areas where you’ll actually care enough to stick with it and grow.",
    culture:"What kind of vibe do you like at work? Chill and quiet? Fast-paced and loud? Do you want a boss who checks in often or leaves you alone to figure it out? Whether it’s structure, freedom, teamwork, or solo time — the right fit matters for long-term success.",
    income:"What’s your financial goal right now? Are you trying to pay bills, save up, or earn enough to fund something bigger? Beyond money, what else matters — learning, connections, freedom, purpose? Knowing what you want to get out of work helps choose jobs that give something back.",
    dealBreakers:"Are there any things you definitely don’t want? Long commutes? Boring work? Bad energy? Low pay? Toxic people? And what’s non-negotiable — flexibility, respect, creative freedom, weekends off? This helps avoid situations that drain you and focus on jobs that support you, not just use you.",
  },
  vision:{
    self:"Who do you want to become in a few years? Think big — even if it feels far off. Do you see yourself as a leader, a creator, a business owner, or just more confident and free? This helps guide choices today that shape the person you’re growing into.",
    learn:"What do you wish you knew how to do? Maybe it’s coding, editing video, leading a team, speaking better, or managing money. You don’t need to know it yet — just be real about what you want to learn. That gives direction for where to aim your energy next.",
    roles:"Are there specific jobs or titles you’d love to have someday? That could be anything from 'content creator' to 'head chef' to 'freelancer who sets my own hours.' Knowing what role you want helps find smaller steps that build toward that dream in real, practical ways.",
    legacy:"What kind of difference do you want to make? Maybe you want to help people, build something important, support your family, or just prove to yourself you can do it. Think about what kind of impact you want your work — and your life — to actually have.",
    changes:"What kind of person do you want to grow into? More focused, braver, better with people, more creative, more consistent? Becoming someone new isn’t just about skills — it’s about mindset. Being clear on who you want to be helps shape what you say yes (and no) to now.",
  }
}



export {julesAvery,prompts}
