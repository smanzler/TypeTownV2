interface Text {
    id: number;
    textContent: string;
    difficulty: number;
    name: string;
}

function Levels({
    onLevel: fetchLevel,
    allLevels,
}: {
        onLevel: (id: number) => void;
    allLevels: Text[] | undefined;
}) {
    const handleClick = (id: number) => {
        fetchLevel(id);
    }


    const contents = allLevels === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Name</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                {allLevels.map(Level =>
                    <tr key={Level.id} onClick={() => handleClick(Level.id)}>
                        <td>{Level.id}</td>
                        <td>{Level.name}</td>
                        <td>{Level.difficulty}</td>
                    </tr>
                )}
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