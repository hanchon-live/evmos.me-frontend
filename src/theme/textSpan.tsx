interface data {
    content: string;
}
export default function TextSpan({ content }: data) {
    return <span style={{ overflowWrap: 'anywhere' }}>{content}</span>;
}
