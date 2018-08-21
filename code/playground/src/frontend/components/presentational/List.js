import React from "react";

const List = ({ articles }) => (
    <ul className="list-group list-group-flush">
        {articles.map(el => (
            <li className="list-group-item" key={el.id}>
                {el.id}: {el.title}
            </li>
        ))}
    </ul>
);

export default List;
