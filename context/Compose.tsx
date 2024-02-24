// Compose.tsx

interface Props {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
    children: React.ReactNode
}

export  function ProviderComposer(props: Props) {
    const { components = [], children } = props

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}