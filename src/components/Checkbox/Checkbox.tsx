import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./Checkbox.scss";
import formatData from "../../FormatData";

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

const deptData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const initialData: Department[] = formatData(deptData);

const CheckBox: React.FC = () => {
  const [treeData, setTreeData] = useState<Department[]>(initialData);

  const toggleSubDepartments = (department: string) => {
    setTreeData((prevData) => {
      return prevData.map((node) => {
        if (node.department === department) {
          return {
            ...node,
            showSubDepartments: !node.showSubDepartments,
          };
        }
        return node;
      });
    });
  };

  const handleDepartmentChange = (department: string) => {
    setTreeData((prevData) => {
      return prevData.map((node) => {
        if (node.department === department) {
          const newCheckedState = !node.checked;

          return {
            ...node,
            checked: newCheckedState,
            sub_departments: node.sub_departments.map((subDept) => ({
              ...subDept,
              checked: newCheckedState,
            })),
          };
        }
        return node;
      });
    });
  };

  const handleSubDepartmentChange = (
    department: string,
    subDepartment: SubDepartment
  ) => {
    setTreeData((prevData) => {
      return prevData.map((node) => {
        if (node.department === department) {
          const updatedSubDepartments = node.sub_departments.map((subDept) =>
            subDept.id === subDepartment.id
              ? { ...subDept, checked: !subDept.checked }
              : subDept
          );

          return {
            ...node,
            checked: updatedSubDepartments.every((subDept) => subDept.checked),
            sub_departments: updatedSubDepartments,
          };
        }
        return node;
      });
    });
  };

  const renderTree = (nodes: Department[]) =>
    nodes.map((node) => (
      <div key={node.department} className="checkbox-main">
        <label>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
            value={node.department}
            checked={
              node.checked ||
              (node.sub_departments &&
                node.sub_departments.every((subDept) => subDept.checked))
            }
            onChange={() => handleDepartmentChange(node.department)}
          />
          {node.department}
        </label>
        <button
          className="arrow-icon"
          onClick={() => toggleSubDepartments(node.department)}
        >
          {node.showSubDepartments ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </button>
        {node.showSubDepartments && node.sub_departments && (
          <div style={{ marginLeft: "20px" }}>
            {node.sub_departments.map((subDept) => (
              <div key={subDept.id}>
                <label>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "controlled" }}
                    value={subDept.name}
                    checked={subDept.checked}
                    onChange={() =>
                      handleSubDepartmentChange(node.department, subDept)
                    }
                  />
                  {subDept.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    ));

  return <div>{renderTree(treeData)}</div>;
};

export default CheckBox;
