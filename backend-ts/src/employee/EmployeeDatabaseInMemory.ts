import { EmployeeDatabase } from "./EmployeeDatabase";
import { Employee } from "./Employee";

export class EmployeeDatabaseInMemory implements EmployeeDatabase {
    private employees: Map<string, Employee>

    constructor() {
        this.employees = new Map<string, Employee>();
        this.employees.set("1", { 
            id: "1", 
            name: "Jane Doe", 
            age: 22,
            gender: "女性",
            department: "A",
            skills: ["フロントエンド", "デザイン"],
            qualifications: ["Webデザイン検定"],
            hireYear: 2022,
            aspirations: ["PM", "デザイン"]
        });
        this.employees.set("2", { 
            id: "2", 
            name: "John Smith", 
            age: 28,
            gender: "男性",
            department: "B",
            skills: ["バックエンド", "クラウド"],
            qualifications: ["AWS認定ソリューションアーキテクト"],
            hireYear: 2019,
            aspirations: ["PM", "クラウド"]
        });
        this.employees.set("3", { 
            id: "3", 
            name: "山田 太郎", 
            age: 27,
            gender: "男性",
            department: "C",
            skills: ["フロントエンド", "バックエンド"],
            qualifications: ["応用情報技術者"],
            hireYear: 2021,
            aspirations: ["フロントエンド", "バックエンド"]
        });
        this.employees.set("4", { 
            id: "4", 
            name: "山田 花子", 
            age: 27,
            gender: "女性",
            department: "D",
            skills: ["デザイン", "PM"],
            qualifications: ["Webデザイン検定"],
            hireYear: 2020,
            aspirations: ["PM"]
        });
        this.employees.set("5", { 
            id: "5", 
            name: "布施 悠", 
            age: 27,
            gender: "男性",
            department: "A",
            skills: ["クラウド", "バックエンド"],
            qualifications: ["GCP認定"],
            hireYear: 2023,
            aspirations: ["クラウド", "バックエンド"]
        });
        this.employees.set("6", { 
            id: "6", 
            name: "藤井 大輝", 
            age: 27,
            gender: "男性",
            department: "B",
            skills: ["フロントエンド"],
            qualifications: ["HTML5プロフェッショナル"],
            hireYear: 2018,
            aspirations: ["フロントエンド", "デザイン"]
        });
        this.employees.set("7", { 
            id: "7", 
            name: "小林 一郎", 
            age: 27,
            gender: "男性",
            department: "C",
            skills: ["PM", "デザイン"],
            qualifications: ["PMP"],
            hireYear: 2017,
            aspirations: ["PM"]
        });
        this.employees.set("8", { 
            id: "8", 
            name: "中村 佑", 
            age: 27,
            gender: "男性",
            department: "D",
            skills: ["バックエンド", "クラウド"],
            qualifications: ["データベーススペシャリスト"],
            hireYear: 2020,
            aspirations: ["クラウド"]
        });
        this.employees.set("9", { 
            id: "9", 
            name: "垣谷 大輝", 
            age: 27,
            gender: "男性",
            department: "A",
            skills: ["フロントエンド", "バックエンド", "デザイン"],
            qualifications: ["基本情報技術者"],
            hireYear: 2022,
            aspirations: ["フロントエンド", "バックエンド", "デザイン"]
        });
        this.employees.set("10", { 
            id: "10",
            name: "石田 樹",
            age: 27,
            gender: "男性",
            department: "B",
            skills: ["クラウド", "PM"],
            qualifications: ["Azure認定"],
            hireYear: 2016,
            aspirations: ["PM", "クラウド"]
        });
    }

    async getEmployee(id: string): Promise<Employee | undefined> {
        return this.employees.get(id);
    }

    async getEmployees(filterText: string): Promise<Employee[]> {
        const employees = Array.from(this.employees.values());
        if (filterText === "") {
            return employees;
        }
        return employees.filter(employee => employee.name === filterText);
    }
}
