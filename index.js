var app = new Vue({
    el: '#app',
    data: {
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        drums: ['clap', 'hihat', 'kick', 'openhat', 'boom', 'ride', 'snare', 'tink', 'tom'],
    },
    methods: {
        touchPlay(index) {
            let input = this.drums[index]
            console.log(input)
            console.log('mannn', this.$refs[index])
            let playDrum = this.$refs[input] // get the corressponding audio ref
            playDrum.currentTime = 0 // reset sound if already playing
            playDrum.play() // play the drum
            this.addPlaying(this.$refs[index][0])

        },
        playDrum(e) {
            let getKeyCode = e.code // get the key code
            let getKey = getKeyCode.slice(getKeyCode.length - 1) // get the last letter on keyCode
            let keyToLowerCase = getKey.toLowerCase() // change to lower case to compare with drums Array in data

            for (let i = 0; i < this.drums.length; i++) { // for each drum
                if (keyToLowerCase == this.keys[i]) { // if keypress is also in the keys array
                    console.log(`key: ${this.keys[i]} || drum: ${this.drums[i]}`)

                    let drum = this.drums[i] // get the corressponding drum noise
                    console.log('refs: ', this.$refs[drum])

                    let playDrum = this.$refs[drum] // get the corressponding audio ref
                    playDrum.currentTime = 0 // reset sound if already playing
                    playDrum.play() // play the drum
                    console.log('class: ', this.$refs[i][0].classList) // get the ref classes
                    this.addPlaying(this.$refs[i][0])

                }
            }
        },
        addPlaying(x) {
            setTimeout(() => {
                // this.$refs[i][0].classList.toggle('playing')
                x.classList.toggle('playing')
            }, 100);
            x.classList.toggle('playing')
        },
        removeTransition(e) { // recieves event as from eventlistener
            console.log('transition************', e)
            if (e.propertyName !== 'transform') return; // skips if not transforming
            this.classList.remove('playing'); // removes class
            // this. is equal to what is called against it, addeventlistener was called and key was called against it so this. is the key
        }
    },
    created() {
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        // add keyup listener, passes in the event by default
        window.addEventListener('keydown', this.playDrum)
        // const keys = document.querySelectorAll('.key-wrapper'); // get all .key elements
        // keys.forEach(key => key.addEventListener('transitionend', removeTransition) // for each key element on transitionend, run the removeTransition function
        // );

    },
})
