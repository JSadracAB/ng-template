#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

show_menu() {
    clear
    echo -e "${CYAN}🚀 Angular Project Menu${NC}"
    echo -e "${CYAN}========================${NC}"
    echo -e "${GREEN}1. 🌐 Serve development (ng serve)${NC}"
    echo -e "${YELLOW}2. 🧪 Run tests (ng test)${NC}"
    echo -e "${YELLOW}3. 🔧 Run tests in watch mode${NC}"
    echo -e "${BLUE}4. 🏗️  Build for production${NC}"
    echo -e "${PURPLE}5. 🔍 Lint code${NC}"
    echo -e "${YELLOW}6. 📊 Analyze bundle${NC}"
    echo -e "${RED}7. 🧹 Clean and reinstall${NC}"
    echo -e "8. 📝 Generate components"
    echo -e "9. 📄 Generate services"
    echo -e "${RED}0. ❌ Exit${NC}"
    echo -e "${CYAN}========================${NC}"
    echo ""
}

execute_command() {
    local cmd="$1"
    local description="$2"
    
    echo -e "\n${YELLOW}⚡ $description${NC}"
    echo -e "${NC}Executing: $cmd\n${NC}"
    
    if eval "$cmd"; then
        echo -e "\n${GREEN}✅ Command completed successfully!\n${NC}"
    else
        echo -e "\n${RED}❌ Command failed!\n${NC}"
    fi
    
    echo -e "${NC}Press any key to continue...${NC}"
    read -n 1 -s
}

while true; do
    show_menu
    read -p "Choose an option (0-9): " choice
    
    case $choice in
        1)
            execute_command "bun run start" "Starting development server"
            ;;
        2)
            execute_command "bun run test -- --watch=false" "Running tests once"
            ;;
        3)
            execute_command "bun run test" "Running tests in watch mode"
            ;;
        4)
            execute_command "bun run build" "Building for production"
            ;;
        5)
            execute_command "bun run lint" "Linting code"
            ;;
        6)
            execute_command "bun run build -- --stats-json" "Building with bundle analysis"
            echo -e "${CYAN}📊 Use webpack-bundle-analyzer to analyze the bundle${NC}"
            ;;
        7)
            read -p "Are you sure you want to clean node_modules? (y/N): " confirm
            if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
                execute_command "rm -rf node_modules && bun install" "Cleaning and reinstalling dependencies"
            fi
            ;;
        8)
            read -p "Enter component names (separated by spaces): " names
            if [[ -n "$names" ]]; then
                # Convert string to array
                IFS=' ' read -ra name_array <<< "$names"
                
                echo -e "\n${CYAN}📝 Generating ${#name_array[@]} component(s)...${NC}\n"
                
                # Loop through each name and generate component
                for name in "${name_array[@]}"; do
                    if [[ -n "$name" ]]; then
                        echo -e "${YELLOW}⚡ Generating component: $name${NC}"
                        echo -e "${NC}Executing: ng generate component $name\n${NC}"
                        
                        if ng generate component "$name"; then
                            echo -e "${GREEN}✅ Component '$name' generated successfully!${NC}\n"
                        else
                            echo -e "${RED}❌ Failed to generate component '$name'!${NC}\n"
                        fi
                    fi
                done
                
                echo -e "${GREEN}🎉 Finished generating all components!${NC}"
                echo -e "${NC}Press any key to continue...${NC}"
                read -n 1 -s
            else
                echo -e "${RED}❌ No component names provided.${NC}"
                sleep 1
            fi
            ;;
        9)
            read -p "Enter service names (separated by spaces): " names
            if [[ -n "$names" ]]; then
                # Convert string to array
                IFS=' ' read -ra name_array <<< "$names"
                
                echo -e "\n${CYAN}📄 Generating ${#name_array[@]} service(s)...${NC}\n"
                
                # Loop through each name and generate service
                for name in "${name_array[@]}"; do
                    if [[ -n "$name" ]]; then
                        echo -e "${YELLOW}⚡ Generating service: $name${NC}"
                        echo -e "${NC}Executing: ng generate service $name\n${NC}"
                        
                        if ng generate service "$name"; then
                            echo -e "${GREEN}✅ Service '$name' generated successfully!${NC}\n"
                        else
                            echo -e "${RED}❌ Failed to generate service '$name'!${NC}\n"
                        fi
                    fi
                done
                
                echo -e "${GREEN}🎉 Finished generating all services!${NC}"
                echo -e "${NC}Press any key to continue...${NC}"
                read -n 1 -s
            else
                echo -e "${RED}❌ No service names provided.${NC}"
                sleep 1
            fi
            ;;
        0)
            echo -e "${GREEN}👋 Goodbye!${NC}"
            break
            ;;
        *)
            echo -e "${RED}❌ Invalid option. Please try again.${NC}"
            sleep 1
            ;;
    esac
done
