#!/bin/bash

log_message_success() {
    local text="$1"
    echo -e "\e[32m$text\e[0m"
}

log_message_info() {
    local text="$1"
    echo -e "\e[34m$text\e[0m"
}

add_script_to_package_json() {
    local script_name="$1"
    local script_content="$2"

    if [ ! -f "package.json" ]; then
        echo "Error: 'package.json' not found."
        return 1
    fi

    jq --arg name "$script_name" --arg content "$script_content" '.scripts += {($name): $content}' package.json > temp.json
    mv temp.json package.json

    npx eslint package.json --fix

    log_message_info "Script Added: $script_name to package.json"
}

add_content_to_file() {
    local file_path="$1"
    local content="$2"

    if [ ! -f "$file_path" ]; then
        echo "Error: '$file_path' not found."
        return 1
    fi

    echo "$content" >> "$file_path"
    log_message_info "File Updated: $file_path"
}

create_file_with_content() {
    local file_path="$1"
    local content="$2"

    echo "$content" > "$file_path"
    log_message_info "File Created: $file_path"
}
