interface SubDepartment {
  name: string;
  id: number;
  checked: boolean;
}

interface Department {
  department: string;
  sub_departments: SubDepartment[];
  checked: boolean;
  showSubDepartments: boolean;
}

const formatData = (
  deptData: { department: string; sub_departments: string[] }[]
): Department[] => {
  let idCounter = 1;

  return deptData.map((dept) => {
    const subDepartments: SubDepartment[] = dept.sub_departments.map(
      (subDept) => ({
        name: subDept,
        id: idCounter++,
        checked: false,
      })
    );

    return {
      department: dept.department,
      sub_departments: subDepartments,
      checked: false,
      showSubDepartments: false,
    };
  });
};

export default formatData;
