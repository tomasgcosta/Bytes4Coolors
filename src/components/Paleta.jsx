import styles from '../modules/Paleta.module.css'
import { useState, useEffect } from 'react'
import { AiOutlineLock, AiOutlineCopy } from 'react-icons/ai';




function Paleta() {

    const [color, setColor] = useState(["#AC92EB", "#4FC1E8", "#A0D568", "#FFCE54", "#ED5564"])
    const [blocked, setBlocked] = useState([false, false, false, false, false])

    /* [
        {
            color: `#ff00ff`,
            blocked: false
        }
    ] */

    function gerarPaleta() {
        setColor(cores => cores.map((cor, i) => {
            if (blocked.at(i) === false) {
                return gerarCor()
            }
            return cor
        }))
    }

    function handleBlock(i) {
        setBlocked(previousStatus => previousStatus.map((b, idx) => i === idx ? !b : b))
    }

    function gerarCor() {
        const codigo = 'abcdef123456789'
        let resultado = ''
        for (let j = 0; j < 6; j++) {
            resultado += codigo.charAt(Math.floor(Math.random() * codigo.length))
        }

        resultado = "#" + resultado
        return resultado
    }

    useEffect(() => {
        function handleKeyPress(event) {

            if (event.keyCode === 32) {
                gerarPaleta();
            }
        }


        document.addEventListener('keypress', handleKeyPress)
    }, []);

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.innerWrapper}>
                    {color.map((ele, i) =>
                        <div className={styles.colorCard}>
                            <div style={{ backgroundColor: ele, boxShadow: '1px 2px 3px #000' }} className={styles.colorSlot}>

                                <button className={styles.copyColorCode} onClick={() => { navigator.clipboard.writeText(ele.slice(1)) }}><AiOutlineCopy className={styles.copyComponentBtn} /></button>
                                <button className={styles.blockColor} onClick={(e) => handleBlock(i)}><AiOutlineLock className={styles.blockComponentBtn} /></button>
                            </div>
                            <p>{ele}</p>
                        </div>
                    )}
                </div>
                <div>
                    <button className={styles.generateColor} onClick={gerarPaleta}>Gerar cores</button>
                </div>
            </div>
        </div>
    )
}


export { Paleta }