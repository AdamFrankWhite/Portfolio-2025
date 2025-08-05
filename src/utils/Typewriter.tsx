import React, { useState, useEffect } from "react";
type TypingTextProps = {
    phrases: string[];
};
const TypingText = ({ phrases }: TypingTextProps) => {
    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let timeout: NodeJS.Timeout;

        if (isTyping) {
            if (charIndex < currentPhrase.length) {
                // Typing forward
                timeout = setTimeout(() => {
                    setText(currentPhrase.slice(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, 150);
            } else {
                // Finished typing, pause before deleting
                // setIsPaused(true);
                timeout = setTimeout(() => {
                    setIsTyping(false); // switch to deleting
                }, 2000); // pause for 2s
            }
        } else {
            if (charIndex > 0) {
                // Deleting backward
                timeout = setTimeout(() => {
                    setText(currentPhrase.slice(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, 75);
            } else {
                // Done deleting, move to next word
                setIsTyping(true);
                setPhraseIndex((phraseIndex + 1) % phrases.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, phraseIndex, phrases]);

    return (
        <div style={styles.container}>
            <span style={styles.text}>{text}</span>
            <span className="blinking-cursor">|</span>
        </div>
    );
};

const styles = {
    container: {
        fontSize: "2rem",
        color: "#00ff00",
        display: "inline-block",
    },
    text: {
        whiteSpace: "pre",
    },
};

export default TypingText;
