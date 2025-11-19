import { Component, createRef } from "react";

const deptStatusList = {
  Engineering: ["active", "paused", "completed"],
  Marketing: ["planning", "active", "on-hold"],
  Default: ["planning", "active"],
};

export class AddProjectModal extends Component {
  firstInputRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      department: "",
      status: "",
      ownerEmail: "",
      budget: "",
      errors: {},
    };
  }

  componentDidUpdate(prev) {
    if (!prev.isOpen && this.props.isOpen) {
      this.firstInputRef.current?.focus();
      if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
  }

  validateForm = () => {
    const errs = {};
    const { name, department, status, ownerEmail, budget } = this.state;

    if (!name.trim()) errs.name = "Project name is required";
    if (!department) errs.department = "Select a department";
    if (!status) errs.status = "Select a status";
    if (!ownerEmail || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(ownerEmail))
      errs.ownerEmail = "Valid email required";
    if (!budget || isNaN(Number(budget)))
      errs.budget = "Budget should be a number";

    this.setState({ errors: errs });
    return Object.keys(errs).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;

    const { name} = this.state;

    this.props.onSubmit({
      id: Date.now(),
      message: "Project Created Successfully.",
      type: "Project creation",
      ref: null,
      seen: false,
      createdAt:Date.now()
    });

    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Project Added", {
          body: `Project "${name}" has been added successfully.`,
        });
      } else {
        console.log("Notification permission denied or not supported.");
      }
    } else {
      console.log("This browser does not support notifications.");
    }

    this.setState(
      {
        name: "",
        department: "",
        status: "",
        ownerEmail: "",
        budget: "",
        errors: {},
      },
      () => {
        this.firstInputRef.current?.focus();
      }
    );

    this.props.onClose();
  };

  updateField = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    if (!this.props.isOpen) return null;

    const { name, department, status, ownerEmail, budget, errors } = this.state;
    const currStatuses = deptStatusList[department] || deptStatusList.Default;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 text-white">
        <form
          onSubmit={this.handleSubmit}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Add Project</h2>
            <button
              type="button"
              onClick={this.props.onClose}
              className="text-white/50 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-white/70">Project Name</label>
              <input
                ref={this.firstInputRef}
                value={name}
                onChange={(e) => this.updateField("name", e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-white/70">Department</label>
                <select
                  value={department}
                  onChange={(e) =>
                    this.updateField("department", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm"
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                </select>
                {errors.department && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-white/70">Status</label>
                <select
                  value={status}
                  onChange={(e) => this.updateField("status", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm"
                >
                  <option value="">Select status</option>
                  {currStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-xs text-red-400">{errors.status}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-white/70">Owner Email</label>
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => this.updateField("ownerEmail", e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm"
              />
              {errors.ownerEmail && (
                <p className="mt-1 text-xs text-red-400">{errors.ownerEmail}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-white/70">Budget</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => this.updateField("budget", e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm"
              />
              {errors.budget && (
                <p className="mt-1 text-xs text-red-400">{errors.budget}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={this.props.onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/80 hover:border-white hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    );
  }
}
