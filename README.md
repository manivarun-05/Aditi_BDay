# ✨ Aditi's 21st Birthday Surprise Website

> **Dedicated to Aditi (Ishaa) from her bestest friend Mani**  
> *"To Billie from Billoute, always."*

---

## 🌟 Overview

This is a premium, cinematic, emotional interactive story created specifically for Aditi's 21st birthday (September 6, 2005).

It features:
1. **Cinematic Starlight Prelude** (twinkling starfield, shooting stars, typewriter build-up)
2. **"Open Your Surprise ✨"** digital gift unboxing transition with confetti and floating hearts
3. **Floating Music Sanctuary** with play/pause, mute, and animated soundwave visualizer bars
4. **Hero Birthday Shrine** ("Celebrating You" dedication & friendship bond)
5. **"Little Moments, Big Memories"** polaroid wall with 3D perspective tilt & interactive Lightbox modal
6. **"Your Journey"** interactive milestone timeline from 2005 to Chapter 21
7. **"Things I Admire About You"** appreciation prism cards
8. **Digital Wax-Seal Handwritten Letter** (break the seal to unfold the parchment letter)
9. **The Memory Vault** (interactive 3D flip cards with secret inside stories)
10. **A Very Serious Scientific Analysis** (animated counters for laughs, 2 AM talks, shared braincells, etc.)
11. **For The Year Ahead** (constellation of future wishes)
12. **The Grand Birthday Finale** with multi-wave fireworks, confetti burst, and floating photo collage
13. **Secret Easter Egg Pin** in the bottom left corner ("P.S. You're stuck with me for at least 80 years!")

---

## 🚀 How to Run Locally

This website is built with **zero external build dependencies**. You do **not** need Node, npm, or Python.

### Option 1: Double-Click
Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, Safari, or Firefox!

### Option 2: VS Code / IDE Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🎨 How to Customize Content

Everything is controlled from one single file:
👉 **`js/config.js`**

Open `js/config.js` in any text editor to customize:
* **Names & Nicknames**: `recipientName: "Aditi"`, `nickname: "Ishaa"`, `senderName: "Mani"`
* **Inside Joke**: `insideJoke: "To Billie from Billoute"`
* **Date & Age**: `birthDate: "2005-09-06"`, `milestoneAge: 21`
* **Photos & Captions**: in the `memories` array
* **Timeline milestones**: in the `timeline` array
* **Things I Admire**: in the `admirations` array
* **Heartfelt Letter**: in the `letter` object
* **Secret Memory Cards**: in the `secretCards` array
* **Fun Statistics**: in the `scientificStats` object
* **Future Wishes**: in the `futureWishes` array
* **Song details**: in the `audio` object

---

## 📸 Replacing Photos

Simply place your own photos into the **`images/`** folder:
* `photo-01.jpg`
* `photo-02.jpg`
* `photo-03.jpg`
* `photo-04.jpg`
* `photo-05.jpg`
* `photo-06.jpg`

*(Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`)*.

---

## 🎵 Background Music — "Apna Bana Le"

The song has been set to **"Apna Bana Le"** (Arijit Singh & Sachin-Jigar from *Bhediya*):
* **Automatic Streaming**: Directly streams the official full song via the embedded YouTube player (`e-ORhEE9VVg`).
* **Custom Local File**: You can also place an MP3 file in `audio/apna-bana-le.mp3` or `audio/birthday-song.mp3`.
* **Music Box Fallback**: If offline, the website plays a procedural music-box synthesizer rendition of the actual melody of *"Tu mera koi na hoke bhi kuch laage... Apna bana le piya"*.

---

## 🌐 Deploying Online (Free & Instant)

You can share this live with Aditi by uploading this folder to any free static host:

### 1. Vercel
- Go to [vercel.com](https://vercel.com)
- Drag and drop this folder
- Your live site will be ready in 10 seconds!

### 2. Netlify
- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag and drop this folder
- Get a public link immediately!

### 3. GitHub Pages
- Create a new repository on GitHub
- Upload these files
- Go to Settings > Pages > Select `main` branch > Save
