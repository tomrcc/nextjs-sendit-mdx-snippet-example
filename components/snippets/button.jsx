export default function ButtonSnippet({ button_text, button_link }) {
	return (
		<div style={{backgroundColor: 'red'}}>
			<a href={button_link}>{button_text}</a>
		</div>
	);
}
