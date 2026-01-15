# AI System Validation Checklist

This checklist ensures that AI assistants consistently reference and adhere to your system documentation (`DESIGN_SYSTEM.md` and `AGENTS.md`).

## Pre-Task Validation

### Documentation Review (MANDATORY)
- [ ] **Read DESIGN_SYSTEM.md** - Review relevant sections for UI/UX requirements
- [ ] **Read AGENTS.md** - Review technical patterns and implementation standards
- [ ] **Identify applicable sections** - Note which parts of the documentation apply to the current task
- [ ] **Check for conflicts** - Ensure no contradictions between requirements

### Task Planning
- [ ] **Define scope** - Clearly understand what needs to be implemented
- [ ] **Map to documentation** - Identify which guidelines and patterns apply
- [ ] **Plan approach** - Outline implementation strategy following documented patterns
- [ ] **Identify dependencies** - Note any required components, colors, or patterns

## Implementation Validation

### Design System Compliance
- [ ] **Color Palette** - Only use colors defined in DESIGN_SYSTEM.md
- [ ] **Typography** - Follow the established font hierarchy and scales
- [ ] **Spacing System** - Use defined spacing tokens and grid system
- [ ] **Component Specifications** - Match documented component patterns exactly
- [ ] **Brand Voice** - Maintain consistent tone and messaging
- [ ] **Accessibility** - Meet all WCAG requirements specified in documentation

### Technical Standards Compliance
- [ ] **File Structure** - Follow established directory and naming conventions
- [ ] **Code Patterns** - Use documented architectural patterns
- [ ] **Error Handling** - Implement proper error handling as specified
- [ ] **TypeScript Types** - Use proper typing patterns
- [ ] **Testing** - Follow established testing strategies
- [ ] **Performance** - Adhere to performance budgets and optimization guidelines

### Cross-Reference Validation
- [ ] **Consistency Check** - Ensure implementation aligns with existing codebase
- [ ] **Pattern Matching** - Verify similar components follow the same patterns
- [ ] **Integration Points** - Confirm proper integration with existing systems
- [ ] **Documentation Updates** - Update docs if new patterns are established

## Post-Implementation Validation

### Quality Assurance
- [ ] **Visual Consistency** - Compare with design system specifications
- [ ] **Functional Testing** - Verify all features work as expected
- [ ] **Accessibility Testing** - Validate screen reader compatibility and keyboard navigation
- [ ] **Performance Testing** - Check Core Web Vitals and loading times
- [ ] **Cross-browser Testing** - Ensure compatibility across target browsers

### Documentation Compliance
- [ ] **Reference Citations** - Explicitly mention which documentation sections were followed
- [ ] **Deviation Explanations** - Document any necessary deviations from standards
- [ ] **Pattern Consistency** - Confirm implementation follows established patterns
- [ ] **Future Maintainability** - Ensure code follows documented maintenance patterns

## Common Validation Failures

### Design System Violations
❌ **Using undefined colors** - Always reference the color palette sections
❌ **Inconsistent spacing** - Use only defined spacing tokens
❌ **Custom components** - Follow documented component specifications
❌ **Missing accessibility** - Include all required ARIA attributes and semantic HTML
❌ **Performance issues** - Exceed defined performance budgets

### Technical Standard Violations
❌ **Wrong file structure** - Not following established directory conventions
❌ **Missing error handling** - Not implementing documented error patterns
❌ **Inconsistent typing** - Not following TypeScript patterns
❌ **Missing tests** - Not implementing required test coverage
❌ **Security issues** - Not following documented security guidelines

## Validation Commands

### Automated Checks
```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Testing
pnpm test

# Build validation
pnpm build

# Performance audit
pnpm audit:performance
```

### Manual Validation Steps
1. **Visual Review** - Compare implementation with design system
2. **Code Review** - Check against technical standards
3. **Documentation Review** - Verify all requirements are met
4. **Integration Testing** - Test with existing components
5. **Accessibility Audit** - Use screen readers and keyboard navigation

## Emergency Override Protocol

If documentation standards cannot be followed:

1. **Document the reason** - Explain why standards cannot be met
2. **Propose alternative** - Suggest compliant alternative approach
3. **Get approval** - Confirm deviation is acceptable
4. **Update documentation** - Add new patterns if they become standard
5. **Create follow-up task** - Plan to align with standards in future

## Validation Success Criteria

✅ **All checklist items completed**
✅ **No documentation violations**
✅ **Consistent with existing patterns**
✅ **Meets performance requirements**
✅ **Passes accessibility audit**
✅ **Proper error handling implemented**
✅ **Code follows established patterns**
✅ **Documentation properly referenced**

## Quick Reference

### Key Documentation Sections
- **DESIGN_SYSTEM.md**: Colors, typography, components, accessibility, performance
- **AGENTS.md**: Architecture, patterns, testing, deployment, security

### Critical Validation Points
1. Color usage from defined palette
2. Component specifications adherence
3. File structure conventions
4. Error handling patterns
5. Accessibility requirements
6. Performance budgets
7. TypeScript typing standards
8. Testing coverage requirements

---

**Remember**: This checklist is your safety net. Use it consistently to ensure all AI interactions maintain the high standards defined in your system documentation.