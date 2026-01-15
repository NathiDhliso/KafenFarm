# Kafen Farm Application

A production-ready full-stack React application for Kafen Farm, featuring modern design, accessibility, and performance optimization.

## 🤖 For AI Assistants

**CRITICAL**: Before making any changes to this project, you MUST:

1. **Read the system documentation**:
   - [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - Complete UI/UX guidelines and component specifications
   - [`AGENTS.md`](./AGENTS.md) - Technical patterns and implementation standards
   - [`AI_VALIDATION_CHECKLIST.md`](./AI_VALIDATION_CHECKLIST.md) - Comprehensive validation checklist

2. **Follow the validation process**:
   - Use the automated reminders in the documentation
   - Complete all checklist items before finishing tasks
   - Reference specific documentation sections in your implementations
   - Explain any deviations from established standards

3. **Maintain consistency**:
   - Use only defined colors from the palette
   - Follow component specifications exactly
   - Implement proper accessibility features
   - Meet performance standards

## Project Structure

```
├── client/                 # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Route components
│   └── hooks/             # Custom React hooks
├── server/                # Express backend
├── shared/                # Shared types and utilities
├── DESIGN_SYSTEM.md       # 🎨 UI/UX Guidelines (MANDATORY READ)
├── AGENTS.md              # 🔧 Technical Standards (MANDATORY READ)
└── AI_VALIDATION_CHECKLIST.md  # ✅ Validation Guide
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Documentation Hierarchy

1. **DESIGN_SYSTEM.md** - Visual design, components, accessibility, performance
2. **AGENTS.md** - Architecture, patterns, testing, deployment
3. **AI_VALIDATION_CHECKLIST.md** - Step-by-step validation process
4. **README.md** - Project overview and quick reference

## AI Assistant Workflow

### Before Starting Any Task:
1. ✅ Review relevant sections of DESIGN_SYSTEM.md
2. ✅ Check AGENTS.md for technical patterns
3. ✅ Note applicable validation checklist items

### During Implementation:
1. 🎨 Use only defined design tokens
2. 🧩 Follow component specifications
3. ♿ Include accessibility features
4. ⚡ Meet performance standards

### Before Completing:
1. 🔍 Cross-reference with documentation
2. ✅ Complete validation checklist
3. 📊 Verify performance impact
4. 🎯 Confirm accessibility compliance

## Key Standards

### Design System Compliance
- **Colors**: Use only the defined palette in DESIGN_SYSTEM.md
- **Typography**: Follow the established hierarchy and scales
- **Components**: Match documented specifications exactly
- **Accessibility**: Meet all WCAG requirements

### Technical Standards
- **File Structure**: Follow established conventions
- **Error Handling**: Implement documented patterns
- **Testing**: Maintain required coverage
- **Performance**: Stay within defined budgets

## Emergency Override

If documentation standards cannot be followed:
1. Document the reason clearly
2. Propose compliant alternatives
3. Update documentation if new patterns emerge
4. Create follow-up tasks for alignment

---

**Remember**: The documentation is your source of truth. When in doubt, always reference DESIGN_SYSTEM.md and AGENTS.md before proceeding.