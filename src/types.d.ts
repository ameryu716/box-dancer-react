interface link_box_type {
    name: string,
    link: string,
    key: string,
    is_dir: boolean,
}

interface folder_box_type {
    name: string,
    key: string,
    is_dir: boolean,
    childs: []
}

export {link_box_type,folder_box_type}