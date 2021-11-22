interface data {
    content: string;
}
export default function TextSpan({ content }: data) {
    return <div style={{ overflowWrap: 'anywhere' }}>{content}</div>;
}
