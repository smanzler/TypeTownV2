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
        : <table className="table" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th className="skinny">Level</th>
                    <th className="wide">Name</th>
                    <th className="skinny">Difficulty</th>
                </tr>
            </thead>
            <tbody>
                {allLevels.map(Level =>
                    <tr className="hover:bg-slate-700 hover:cursor-pointer bold" key={Level.id} onClick={() => handleClick(Level.id)}>
                        <td className="skinny">{Level.id}</td>
                        <td className="wide">{Level.name}</td>
                        <td className="skinny">{Level.difficulty}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Levels:</h1>
            {contents}
        </div>
    );

}

export default Levels;