// Embed external website via iframe - CORREGIDO para Framer
import { addPropertyControls, ControlType } from "framer"
import { type CSSProperties } from "react"

interface EmbedPageProps {
    url: string
    allowFullscreen: boolean
    allowScrolling: boolean
    borderRadius: number
    style?: CSSProperties
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function EmbedPage(props: EmbedPageProps) {
    const {
        url = "https://app-ei-gamma.vercel.app",
        allowFullscreen = true,
        allowScrolling = true,
        borderRadius = 8,
    } = props

    return (
        <iframe
            src={url}
            style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: `${borderRadius}px`,
            }}
            // Permisos necesarios para la aplicación
            allow="camera; microphone; geolocation; autoplay; encrypted-media; fullscreen; display-capture"
            // Sandbox con todos los permisos necesarios
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
            // Atributos legacy
            allowFullScreen={allowFullscreen}
            scrolling={allowScrolling ? "yes" : "no"}
            title="Seminario Inteligencia Energética"
            // Mejora de rendimiento
            loading="lazy"
            // Importante: permite comunicación entre frames
            referrerPolicy="strict-origin-when-cross-origin"
        />
    )
}

addPropertyControls(EmbedPage, {
    url: {
        type: ControlType.String,
        title: "Website URL",
        defaultValue: "https://app-ei-gamma.vercel.app",
        placeholder: "https://example.com",
    },
    allowFullscreen: {
        type: ControlType.Boolean,
        title: "Allow Fullscreen",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    allowScrolling: {
        type: ControlType.Boolean,
        title: "Allow Scrolling",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 8,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
    },
})

