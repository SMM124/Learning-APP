const x={},b="gemini-2.5-flash",y="gemini-1.5-flash";const g=[];function E(e){if(!e||typeof e!="string")return"";const t=[/ignore (?:all )?(?:previous|prior) instructions/i,/disregard (?:all )?(?:previous|prior) instructions/i,/system prompt/i,/reveal your (?:system|hidden) instructions/i,/you are now in DAN mode/i,/jailbreak/i,/act as (?:an unrestricted|root|sudo)/i];for(const n of t)if(n.test(e))throw new Error("অননুমোদিত প্রম্পট শনাক্ত হয়েছে। অনুগ্রহ করে শুধুমাত্র পাঠ্যক্রম ও শিক্ষামূলক প্রশ্ন করুন।");return e}function k(e){if(!e||typeof e!="string")return"";let t=e.replace(/(\+?8801[3-9]\d{8}|01[3-9]\d{8})/g,"[ফোন নম্বর গোপন]");return t=t.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,"[ইমেইল গোপন]"),t}function B(){const e=Date.now();for(;g.length>0&&g[0]<=e-6e4;)g.shift();if(g.length>=15){const t=Math.max(1,Math.ceil((g[0]+6e4-e)/1e3));throw new Error(`খুব দ্রুত একাধিক অনুরোধ করা হয়েছে। অনুগ্রহ করে ${t} সেকেন্ড অপেক্ষা করে আবার প্রশ্ন করুন।`)}return g.push(e),!0}const C=()=>localStorage.getItem("scholarly_gemini_key")||typeof import.meta<"u"&&(x==null?void 0:x.VITE_GEMINI_API_KEY)||"",v=e=>{e?localStorage.setItem("scholarly_gemini_key",e.trim()):localStorage.removeItem("scholarly_gemini_key")};async function u({contents:e,generationConfig:t={},keyToUse:n=null}){var s,d,h,f,S;B();const i=n||C();if(!i)throw new Error("কোনো জেমিনি এপিআই কি (API Key) পাওয়া যায়নি। অনুগ্রহ করে সেটিংস থেকে আপনার API Key যুক্ত করুন।");const a=e.map(l=>l!=null&&l.parts?{...l,parts:l.parts.map(p=>{if(p.text){if(p.text.length>4e3)throw new Error("প্রশ্নের আকার খুব বড় (সর্বোচ্চ 4000 অক্ষর অনুমোদিত)।");return{...p,text:k(E(p.text))}}return p})}:l),r={maxOutputTokens:2048,...t},o=[b,y];let c=null;for(const l of o){const p=`https://generativelanguage.googleapis.com/v1beta/models/${l}:generateContent?key=${i}`;try{const m=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:a,generationConfig:r})});if(m.ok){const w=await m.json(),$=(S=(f=(h=(d=(s=w==null?void 0:w.candidates)==null?void 0:s[0])==null?void 0:d.content)==null?void 0:h.parts)==null?void 0:f[0])==null?void 0:S.text;if($)return $;throw new Error("জেমিনি কোনো টেক্সট রিটার্ন করেনি")}if(m.status===404&&l!==y){console.warn(`Model ${l} returned 404, attempting fallback to ${y}...`);continue}const I=await m.text().catch(()=>"");throw new Error(`Gemini সার্ভার রেসপন্স দেয়নি (কোড: ${m.status} ${m.statusText})`)}catch(m){if(c=m,l===y)break}}throw c||new Error("জেমিনি এআই সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি")}async function G(e){const t=e||C();if(!t)return!1;try{return!!await u({contents:[{role:"user",parts:[{text:'Hello, respond with {"status":"ok"}'}]}],generationConfig:{responseMimeType:"application/json",maxOutputTokens:20},keyToUse:t})}catch{return!1}}const A=`You are a distinguished, warm, and highly knowledgeable Socratic AI Academic Mentor for Bangladeshi NCTB Secondary Education students (Class 6 to Class 10).
Language: Always respond in elegant, standard academic Bengali (বাংলা), maintaining English terms where standard (e.g. in English grammar, computer terminology, or scientific nomenclature).

SUBJECT-SPECIFIC PEDAGOGICAL GUIDELINES:
1. গণিত ও উচ্চতর গণিত (Mathematics & Higher Math):
   - Enclose every variable, formula, fraction, and exponent in LaTeX ($x^2$, $\\frac{1}{x}$, $\\sqrt{6}$).
   - Structure: ### 📌 দেওয়া তথ্য, ### 💡 মূল সূত্রাবলি, ### 📐 ধাপভিত্তিক গাণিতিক প্রতিপাদন, ### 🎯 চূড়ান্ত ফলাফল ও সিদ্ধান্ত, > 💡 শিক্ষকের বিশেষ পরীক্ষার পরামর্শ।
2. বাংলা সাহিত্য ও ব্যাকরণ (Bangla Literature & Grammar):
   - Focus on historical/literary context, theme (মূলভাব), poetic forms (e.g. চতুর্দশপদী সনেট), character analysis, critical thinking (অনুধাবন ও উচ্চতর দক্ষতা), and Bangla Academy grammar rules (সন্ধি, সমাস, কারক, ণ-ত্ব ও ষ-ত্ব বিধান).
   - Structure: ### 📖 সাহিত্যিক প্রেক্ষাপট ও মূলভাব, ### 💡 তাৎপর্যপূর্ণ বিশ্লেষণ ও চরণের ব্যাখ্যা, ### 🎯 বোর্ড সৃজনশীল উত্তর কাঠামো (জ্ঞান/অনুধাবন/প্রয়োগ/উচ্চতর দক্ষতা), > 💡 শিক্ষকের পরীক্ষার টিপস।
3. ইংরেজি (English Language & Literature):
   - Provide clear grammar rules, sentence patterns, authentic bilingual explanations, and transformation steps.
   - Structure: ### 🇬🇧 Grammar Rules & Concepts, ### 📝 Step-by-Step Examples & Analysis, ### 🎯 Practice & Corrections, > 💡 Board Exam Tips & Pitfalls.
4. বিজ্ঞান (পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, সাধারণ বিজ্ঞান):
   - Use scientific rigor, chemical reactions, biological organ/cell functions, laws, definitions, and formulas.
   - Structure: ### 🔬 মূল তত্ত্ব ও বৈজ্ঞানিক সংজ্ঞা, ### 💡 ব্যাখ্যা ও প্রক্রিয়া (বা রাসায়নিক সমীকরণ/চিত্র), ### 🎯 বোর্ড সৃজনশীল উত্তর প্রস্তুতি, > 💡 পরীক্ষায় পূর্ণ নম্বর পাওয়ার টিপস।
5. বাংলাদেশ ও বিশ্বপরিচয়, ইতিহাস, পৌরনীতি ও অর্থনীতি (BGS, History, Social Sciences):
   - Focus on chronological context, causes and historical outcomes, socio-economic impact, and point-by-point analytical breakdowns.
   - Structure: ### 🇧🇩 ঐতিহাসিক প্রেক্ষাপট ও পটভূমি, ### 💡 কারণ, ঘটনাপ্রবাহ ও ফলাফল, ### 🎯 পয়েন্টভিত্তিক অ্যাকাডেমিক বিশ্লেষণ, > 💡 সৃজনশীল পরীক্ষার নির্দেশিকা।
6. তথ্য ও যোগাযোগ প্রযুক্তি (ICT):
   - Cover number systems (Binary/Decimal/Hex), Boolean algebra & Logic gates, web design, database, cyber security, and networking.

You MUST respond strictly with a valid JSON object matching this schema:
{
  "friendlyGreeting": "Warm greeting in Bengali with emojis (e.g. প্রিয় শিক্ষার্থী, আসসালামু আলাইকুম ও শুভেচ্ছা! 🌟)",
  "topic": "Subject and specific chapter/topic name in Bengali (e.g. বাংলা সাহিত্য: কপোতাক্ষ নদ - ৯ম শ্রেণি)",
  "subjectType": "math | science | bangla | english | social | ict",
  "thinkingSteps": [
    "১. প্রশ্ন বিশ্লেষণ ও বিষয়বস্তুর প্রেক্ষাপট নিরূপণ",
    "২. সংশ্লিষ্ট অধ্যায়ের সূত্র, ব্যাকরণ বা মূল তত্ত্ব যাচাই",
    "৩. সোক্রেটিক ইঙ্গিত ও পেডাগজিক্যাল কাঠামো প্রস্তুত"
  ],
  "hint1": "First step-by-step conceptual clue or core context in Bengali",
  "hint2": "Second breakdown, rule, formula, or literary insight in Bengali",
  "socraticQuestion": "Guiding thought-provoking question for the student to solve or reflect upon",
  "fullSolution": "Complete master explanation and solution in Bengali tailored to the subject",
  "isAlgebraSpecial": true/false
}`;function T(e){if(!e)throw new Error("খালি টেক্সট পাওয়া গেছে");let t=e.trim();t.startsWith("```")&&(t=t.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim());try{return JSON.parse(t)}catch(n){const i=t.indexOf("{"),a=t.lastIndexOf("}");if(i!==-1&&a!==-1&&a>i){const r=t.substring(i,a+1);try{return JSON.parse(r)}catch(o){console.warn("Substring parse failed:",o)}}throw new Error(`JSON পার্সিং সমস্যা: ${n.message}`)}}async function N(e,t=9,n=[],i="সাধারণ গণিত",a="socratic"){let r="";Array.isArray(n)&&n.length>1&&(r=n.slice(-4).map(d=>{const h=d.role==="assistant"?"AI Mentor":"Student",f=d.text||d.fullSolution||d.hint1||"";return`${h}: ${f.slice(0,300)}`}).join(`
`));let o="";a==="direct"?o="TUTOR MODE: Direct Walkthrough. Provide concise hints, and in fullSolution provide an immediate, comprehensive, complete master explanation or proof without making the student wait.":a==="exam_tips"?o="TUTOR MODE: Exam Scoring & Hacks. Focus heavily on NCTB Board exam marking criteria, common traps where students lose marks, model answer structure, and time-saving techniques.":o="TUTOR MODE: Socratic Guiding. Emphasize progressive clues in hint1, hint2, and a thought-provoking socraticQuestion so the student reasons through the subject concept before seeing the full answer.";const c=`${A}
${o}

NCTB Curriculum Context:
- Target Class: Class ${t} (Bangladeshi National Curriculum)
- Target Subject: ${i}
${r?`
Recent Conversation History:
${r}
`:""}
Student's Query: "${e}"`;try{const s=await u({contents:[{role:"user",parts:[{text:c}]}],generationConfig:{responseMimeType:"application/json",temperature:.3}});return{success:!0,data:T(s)}}catch(s){return console.error("Gemini API call failed:",s),{success:!1,error:s.message||"অজানা ত্রুটি ঘটেছে"}}}async function _(e,t,n,i){const a=`You are an expert NCTB textbook AI mentor for Bangladeshi students (Class 6 to 10).
Book: "${t}", Page: ${n}.
Page Context:
${i}

Student Question: "${e}"

Provide a friendly, highly structured, scholarly answer in academic Bengali (বাংলা).
Ensure formatting adheres to:
- Use ### for headings
- Use * for bullets
- Use 1., 2. for steps
- Use $...$ for inline math (if math/science)
- Use $$...$$ for centered block equations
- Use > for important board exam tips.`;try{return await u({contents:[{role:"user",parts:[{text:a}]}],generationConfig:{temperature:.3}})||null}catch(r){return console.error("Gemini book assistant error:",r),null}}async function M(e,t,n,i){const a=`You are a distinguished academic tutor for the Bangladeshi NCTB curriculum.
Book: "${e}"
Page: ${t}
Topic: "${n}"
Content of this page:
${i}

Please generate an authentic, highly structured, scholarly summary in elegant Bengali (বাংলা).
Format strictly using:
### 📌 পৃষ্ঠা ${t}-এর মূল সারসংক্ষেপ ও তত্ত্ব
(Detailed conceptual breakdown)

### 📐 মূল সূত্রাবলি / বিষয়ভিত্তিক পয়েন্ট
(Key points, formulas, or literary analysis)

### 🎯 বোর্ড পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্নাবলি
(High-yield Creative/Cognitive questions)

### 💡 শিক্ষকের বিশেষ পরামর্শ
(Advice for achieving full marks)`;try{return await u({contents:[{role:"user",parts:[{text:a}]}],generationConfig:{temperature:.3}})||null}catch(r){return console.error("Gemini summary error:",r),null}}async function U(e,t,n,i="একাডেমিক ড্রাফট",a=""){let r="";a&&a.trim()?r=`Follow this custom instruction from the student to modify, continue, rewrite, or expand the draft: "${a}". Ensure the tone remains high academic standard and seamlessly matches the rest of the text.`:e==="simplify"?r="Simplify the text: make sentences clear, concise, fluent, and easy to memorize for students while preserving scholarly academic Bengali.":e==="expand"?r="Expand the draft: add contemporary context, deeper analysis, literary vocabulary, statistical data, and relevant examples for high board marks.":e==="conclusion"?r="Generate an inspiring, scholarly, and memorable conclusion paragraph (উপসংহার) that wraps up the entire draft convincingly.":e==="continue"?r="Seamlessly continue writing from where the text left off: write the next 1-2 rich, coherent academic paragraphs developing the thesis further without repeating previous words.":e==="vocab"?r="Upgrade vocabulary and phrasing: substitute colloquial or plain words with rich, expressive academic Bengali vocabulary, idioms, and elevated formal prose appropriate for top board examiners.":e==="summary"?r="Generate an authentic, concise 2-3 sentence academic summary (সারসংক্ষেপ বা মূলভাব) capturing the core essence of this writing.":e==="outline"?r="Create a structured outline with key headings and points that a student should follow to write this document to achieve full marks.":e==="translate"?r="Translate and adapt this text between Bengali and English with academic elegance, preserving grammatical precision.":r="Proofread and correct grammar: fix sadhu/cholito language mixing (গুরুচণ্ডালী দোষ), fix spelling errors according to Bangla Academy rules, and improve punctuation.";const o=`You are a renowned Bengali literature and academic language editor for Bangladeshi NCTB students.
Document Type: ${i}
Document Title: "${t}"
Task: ${r}

Current Draft Content:
${n}

Provide the refined draft or addition in standard, elegant Bengali (বাংলা). Format cleanly with Markdown headings (###, ####) or paragraphs as appropriate. Keep it directly usable and academically sound.`;try{return await u({contents:[{role:"user",parts:[{text:o}]}],generationConfig:{temperature:.3}})||null}catch(c){return console.error("Gemini writing assistant error:",c),null}}async function P(e,t="প্রবন্ধ",n=9){const i=`You are a master academic writer and examiner for the Bangladeshi NCTB Secondary Education Curriculum (Class ${n}).
Draft Type: ${t}
Topic / Prompt: "${e}"

Generate a complete, masterfully written, board-exam-standard document in academic Bengali (বাংলা) (or English if the draft is English).
Structure rules:
- Include proper formal salutations, dates, or headings appropriate for ${t}.
- For Essays: Include 1. ভূমিকা, 2-6. মূল বিশ্লেষণ ও পয়েন্টসমূহ, 7. উপসংহার.
- For Applications: Proper formal format (তারিখ, বরাবর, বিষয়, মহোদয়, বিবরণ, বিনীত নিবেদক).
- For Speeches: Engaging opening address, historical/contemporary points, call to action, concluding gratitude.
- For Science Lab Reports: মূল তত্ত্ব, প্রয়োজনীয় যন্ত্রপাতি, পর্যবেক্ষণ ছক, সতর্কতা.
- For Creative Question Answers (সৃজনশীল খসড়া): ক (জ্ঞান), খ (অনুধাবন), গ (প্রয়োগ), ঘ (উচ্চতর দক্ষতা) স্পষ্টভাবে আলাদা অনুচ্ছেদ।
Use markdown headings (###, ####) and bullet points (*). Make it rich, educational, and ready to be used or memorized.`;try{return await u({contents:[{role:"user",parts:[{text:i}]}],generationConfig:{temperature:.4}})||null}catch(a){return console.error("Gemini full draft error:",a),null}}async function D(e,t,n="একাডেমিক ড্রাফট",i=9){const a=`You are a strict, constructive NCTB Senior Board Examiner evaluating a student writing submission (Class ${i}).
Document Type: ${n}
Document Title: "${e}"
Student Content:
${t}

Evaluate this piece strictly according to Bangladeshi Board Marking Criteria out of 10 points.
You MUST respond with a valid JSON object matching this schema:
{
  "totalScore": 8.5,
  "letterGrade": "A+",
  "contentScore": "2.5/3",
  "languageScore": "2.5/3",
  "structureScore": "2.0/2",
  "spellingScore": "1.5/2",
  "overallVerdict": "Summary sentence of the examiner's impression in Bengali",
  "strengths": [
    "First strong point in Bengali",
    "Second strong point in Bengali"
  ],
  "improvements": [
    "First actionable tip for full marks in Bengali",
    "Second actionable tip in Bengali"
  ],
  "spellingCorrections": [
    { "original": "error word", "suggestion": "correct word", "rule": "brief rule" }
  ]
}`;try{const r=await u({contents:[{role:"user",parts:[{text:a}]}],generationConfig:{responseMimeType:"application/json",temperature:.2}});if(!r)throw new Error("No response from examiner");return T(r)}catch(r){return console.error("Gemini evaluation error:",r),null}}async function O({actionType:e="explain_paragraph",bookTitle:t="",pageNumber:n=1,pageTopic:i="",pageContent:a="",customQuery:r=""}){let o="";switch(e){case"explain_paragraph":o="এই পৃষ্ঠার গুরুত্বপূর্ণ অংশটি অত্যন্ত সহজ ভাষায়, বাস্তব জীবনের উদাহরণসহ ব্যাখ্যা করো। কোনো দুর্বোধ্য পরিভাষা থাকলে তার সহজ অর্থ বুঝিয়ে দাও।";break;case"summarize":o="এই পৃষ্ঠার একটি সংক্ষিপ্ত, পরিচ্ছন্ন ও কাঠামোবদ্ধ সারসংক্ষেপ প্রস্তুত করো। প্রধান শিক্ষণীয় পয়েন্টগুলো বুলেট আকারে উপস্থাপন করো।";break;case"explain_formula":o="এই পৃষ্ঠায় উল্লেখিত সকল গাণিতিক বা বৈজ্ঞানিক সূত্র পৃথক করো। প্রতিটি চলক বা প্রতীকের পরিচয় দাও এবং কীভাবে প্রয়োগ করতে হয় তা ধাপে ধাপে বুঝিয়ে দাও। গাণিতিক প্রতীক LaTeX ($...$) এ লিখবে।";break;case"generate_flashcards":o=`এই পৃষ্ঠা থেকে দ্রুত রিভিশনের জন্য ৩টি আকর্ষণীয় প্রশ্ন-উত্তর ফ্ল্যাশকার্ড তৈরি করো। বিন্যাস:
### 📇 ফ্ল্যাশকার্ড ১
**প্রশ্ন:** ...
**উত্তর:** ...`;break;case"concept_checklist":o=`পরীক্ষার আগে শিক্ষার্থী এই পৃষ্ঠা থেকে কী কী অবশ্যই শিখবে, তার একটি টিকচিহ্নযুক্ত চেকলিস্ট তৈরি করো। বিন্যাস:
* [ ] ধারণা ১: ...
* [ ] ধারণা ২: ...`;break;case"generate_practice":o="এই পৃষ্ঠার বিষয়বস্তুর ওপর ভিত্তি করে বোর্ড পরীক্ষার মানের ২টি বহুনির্বাচনী (MCQ) এবং ১টি অনুধাবনমূলক প্রশ্ন তৈরি করো। প্রতিটি প্রশ্নের নিচে সঠিক উত্তর ও ব্যাখ্যা দাও।";break;default:o=r||"এই পৃষ্ঠার মূল বিষয়বস্তু ব্যাখ্যা করো।"}const c=`You are a distinguished NCTB AI Academic Reading Partner for Bangladeshi students (Class 6-10).
Book: "${t}"
Page Number: ${n}
Topic: "${i}"

Page Textbook Content:
${a?a.slice(0,3e3):"সাধারণ পাঠ্যবই বিষয়বস্তু"}

Student Reading Task:
${o}

Instruction:
- Respond in authentic, elegant, and student-friendly Bengali (বাংলা).
- Use ### for section headings.
- Enclose all mathematical notations in LaTeX ($...$ or $$...$$).
- Clearly separate textbook facts with a "> 📖 পাঠ্যবইয়ের মূল তথ্য" quote block.`;try{return await u({contents:[{role:"user",parts:[{text:c}]}],generationConfig:{temperature:.3}})||null}catch(s){throw console.error("Gemini Reading Action error:",s),s}}async function R({classLevel:e=9,subject:t="সাধারণ গণিত",chapter:n="বীজগণিতীয় রাশি",questionType:i="mcq",difficulty:a="medium",count:r=3}){const o=`You are an expert curriculum specialist and question author for the Bangladeshi National Curriculum and Textbook Board (NCTB).
Create ${r} authentic academic practice questions according to these parameters:
- Target Grade: Class ${e} (শ্রেণি: ${e}ম)
- Subject: ${t}
- Chapter / Topic: "${n}"
- Question Format: ${i.toUpperCase()}
- Difficulty Level: ${a} (easy = জ্ঞান ও অনুধাবন, medium = প্রয়োগ, hard = উচ্চতর দক্ষতা)

GUIDELINES:
1. All questions must strictly align with the NCTB Class ${e} syllabus.
2. For MCQ: Provide 4 plausible options, specify the zero-based index of the correct answer (0, 1, 2, or 3), and a step-by-step explanatory rationale.
3. For CQ: Provide a realistic contextual stem (উদ্দীপক) and standard 4-tier sub-questions (ক=১, খ=২, গ=৩, ঘ=৪) along with model answers.
4. For SQ: Provide a short question, expected answer length (2-3 sentences), and model solution.
5. Use LaTeX ($...$) for any mathematical, chemical, or physics equations.

You MUST respond strictly with a valid JSON array conforming to this schema:
[
  {
    "id": "ai-q-1",
    "questionType": "${i}",
    "classLevel": ${e},
    "subject": "${t}",
    "chapter": "${n}",
    "difficulty": "${a}",
    "stem": "Question stem or stimulus (উদ্দীপক বা মূল প্রশ্ন)",
    "options": ["ক) অপশন ১", "খ) অপশন ২", "গ) অপশন ৩", "ঘ) অপশন ৪"],
    "correctIndex": 0,
    "cqParts": [
      { "part": "ক", "question": "জ্ঞানমূলক প্রশ্ন", "marks": 1, "modelAnswer": "উত্তর..." },
      { "part": "খ", "question": "অনুধাবনমূলক প্রশ্ন", "marks": 2, "modelAnswer": "উত্তর..." },
      { "part": "গ", "question": "প্রয়োগমূলক প্রশ্ন", "marks": 3, "modelAnswer": "উত্তর..." },
      { "part": "ঘ", "question": "উচ্চতর দক্ষতামূলক প্রশ্ন", "marks": 4, "modelAnswer": "উত্তর..." }
    ],
    "explanation": "Detailed pedagogical explanation in Bengali",
    "isAiGenerated": true,
    "source": "AI প্রস্তুতকৃত অনুশীলন প্রশ্ন",
    "disclaimer": "এই প্রশ্নটি NCTB কারিকুলাম অনুসারে AI মডেল দ্বারা অনুশীলনের উদ্দেশ্যে তৈরি করা হয়েছে (বোর্ড প্রশ্ন নয়)।"
  }
]`;try{const c=await u({contents:[{role:"user",parts:[{text:o}]}],generationConfig:{responseMimeType:"application/json",temperature:.3}}),s=T(c);return Array.isArray(s)?s:[s]}catch(c){throw console.error("generateAcademicQuestions error:",c),c}}export{M as a,O as b,_ as c,U as d,D as e,P as f,R as g,C as h,N as i,v as s,G as t};
