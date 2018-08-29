import React from "react";

const List = ({ articles }) => (
    <ul>
        {articles.map(el => (
            <li key={el.id}>
                {el.id}: {el.title}
            </li>
        ))}
    </ul>
);

export default List;
