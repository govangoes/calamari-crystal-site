# Temporary Repository Access

A bare repository containing the current `work` branch has been created at:

```
/workspace/calamari-temp.git
```

To inspect or push the code elsewhere, clone from this path. A working tree clone is already available at:

```
/workspace/calamari-temp
```

You can add your own remote and push from either location. Example commands:

```bash
# Clone the temporary repository
git clone /workspace/calamari-temp.git --branch work calamari-temp

# Add a new remote
cd calamari-temp
git remote add origin <YOUR_REMOTE_URL>

# Push the existing work branch
git push origin work
```

The clone at `/workspace/calamari-temp` tracks the `work` branch and is ready for further changes or inspection.
