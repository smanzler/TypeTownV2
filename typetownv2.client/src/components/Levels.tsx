import useLevel from "../hooks/useLevel";


function Levels() {
    const text = useLevel(1);


    const contents = text === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Content</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                <tr key={text.id}>
                    <td>{text.id}</td>
                    <td>{text.textContent}</td>
                    <td>{text.difficulty}</td>
                </tr>
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Text</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
}

export default Levels;