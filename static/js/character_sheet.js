/**
 * character_sheet.js - JavaScript pour la page de création de fiche de personnage
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active au bouton et au contenu correspondant
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Navigation entre les onglets avec les boutons Précédent/Suivant
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextTabId = this.getAttribute('data-next');
            const nextTabBtn = document.querySelector(`[data-tab="${nextTabId}"]`);
            
            if (nextTabBtn) {
                nextTabBtn.click();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevTabId = this.getAttribute('data-prev');
            const prevTabBtn = document.querySelector(`[data-tab="${prevTabId}"]`);
            
            if (prevTabBtn) {
                prevTabBtn.click();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    });
    
    // Gestion de l'affichage du niveau pour les compétences générales
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(input => {
        const levelDisplay = input.nextElementSibling;
        
        // Initialisation
        levelDisplay.textContent = input.value;
        
        // Mise à jour lors du changement
        input.addEventListener('input', function() {
            levelDisplay.textContent = this.value;
            updatePreview();
        });
    });
    
    // Ajout de compétences spéciales
    const addSpecialSkillBtn = document.getElementById('add-special-skill');
    const specialSkillsContainer = document.getElementById('special-skills-container');
    
    if (addSpecialSkillBtn && specialSkillsContainer) {
        addSpecialSkillBtn.addEventListener('click', function() {
            const specialSkill = document.createElement('div');
            specialSkill.className = 'special-skill';
            specialSkill.innerHTML = `
                <div class="form-group">
                    <input type="text" name="special-skill-name[]" placeholder="Nom de la compétence">
                    <div class="skill-level">
                        <label>Niveau: </label>
                        <input type="number" name="special-skill-level[]" min="1" max="10" value="1">
                    </div>
                    <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
                </div>
            `;
            specialSkillsContainer.appendChild(specialSkill);
            
            // Ajouter l'écouteur d'événements pour le bouton de suppression
            const removeBtn = specialSkill.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function() {
                specialSkill.remove();
                updatePreview();
            });
            
            // Ajouter les écouteurs pour la mise à jour de la prévisualisation
            const inputs = specialSkill.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', updatePreview);
            });
            
            updatePreview();
        });
    }
    
    // Ajout de caractéristiques
    const addCharacteristicBtn = document.getElementById('add-characteristic');
    const characteristicsContainer = document.getElementById('characteristics-container');
    
    if (addCharacteristicBtn && characteristicsContainer) {
        addCharacteristicBtn.addEventListener('click', function() {
            const characteristic = document.createElement('div');
            characteristic.className = 'characteristic';
            characteristic.innerHTML = `
                <div class="form-group">
                    <input type="text" name="characteristic-name[]" placeholder="Nom de la caractéristique">
                    <select name="characteristic-rarity[]">
                        <option value="">Rareté</option>
                        <option value="Commune">Commune</option>
                        <option value="Rare">Rare</option>
                        <option value="Unique">Unique</option>
                        <option value="Légendaire">Légendaire</option>
                    </select>
                    <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
                </div>
            `;
            characteristicsContainer.appendChild(characteristic);
            
            // Ajouter l'écouteur d'événements pour le bouton de suppression
            const removeBtn = characteristic.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function() {
                characteristic.remove();
                updatePreview();
            });
            
            // Ajouter les écouteurs pour la mise à jour de la prévisualisation
            const inputs = characteristic.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('input', updatePreview);
            });
            
            updatePreview();
        });
    }
    
    // Ajout de marques de constellation
    const addConstellationMarkBtn = document.getElementById('add-constellation-mark');
    const constellationMarksContainer = document.getElementById('constellation-marks-container');
    
    if (addConstellationMarkBtn && constellationMarksContainer) {
        addConstellationMarkBtn.addEventListener('click', function() {
            const constellationMark = document.createElement('div');
            constellationMark.className = 'constellation-mark';
            constellationMark.innerHTML = `
                <div class="form-group">
                    <input type="text" name="constellation-mark[]" placeholder="Nom et description de la marque">
                    <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
                </div>
            `;
            constellationMarksContainer.appendChild(constellationMark);
            
            // Ajouter l'écouteur d'événements pour le bouton de suppression
            const removeBtn = constellationMark.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function() {
                constellationMark.remove();
                updatePreview();
            });
            
            // Ajouter les écouteurs pour la mise à jour de la prévisualisation
            const inputs = constellationMark.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', updatePreview);
            });
            
            updatePreview();
        });
    }
    
    // Toggle pour la prévisualisation
    const togglePreviewBtn = document.getElementById('toggle-preview');
    const characterPreview = document.getElementById('character-preview');
    
    if (togglePreviewBtn && characterPreview) {
        togglePreviewBtn.addEventListener('click', function() {
            characterPreview.classList.toggle('hidden');
            if (characterPreview.classList.contains('hidden')) {
                togglePreviewBtn.textContent = 'Afficher la prévisualisation';
            } else {
                togglePreviewBtn.textContent = 'Masquer la prévisualisation';
            }
        });
    }
    
    // Fonction pour mettre à jour la prévisualisation
    function updatePreview() {
        // Informations de base
        document.getElementById('preview-name-value').textContent = document.getElementById('character-name').value || '—';
        document.getElementById('preview-firstname-value').textContent = document.getElementById('character-firstname').value || '—';
        document.getElementById('preview-name').textContent = document.getElementById('character-name').value || 'Nom';
        document.getElementById('preview-firstname').textContent = document.getElementById('character-firstname').value || 'Prénom';
        document.getElementById('preview-age').textContent = document.getElementById('character-age').value || '—';
        document.getElementById('preview-birthday').textContent = document.getElementById('character-birthday').value || '—';
        document.getElementById('preview-gender').textContent = document.getElementById('character-gender').value || '—';
        document.getElementById('preview-orientation').textContent = document.getElementById('character-orientation').value || '—';
        
        // Traits de caractère
        const traits = [];
        for (let i = 1; i <= 5; i++) {
            const traitElement = document.getElementById(`character-trait${i}`);
            if (traitElement && traitElement.value.trim()) {
                traits.push(`<li>${traitElement.value}</li>`);
            }
        }
        document.getElementById('preview-traits').innerHTML = traits.length > 0 ? traits.join('') : '<li>—</li>';
        
        // Goûts et passions
        document.getElementById('preview-tastes').textContent = document.getElementById('character-tastes').value || '—';
        document.getElementById('preview-passions').textContent = document.getElementById('character-passions').value || '—';
        
        // Description physique et signes distinctifs
        document.getElementById('preview-physical').textContent = document.getElementById('physical-description').value || '—';
        document.getElementById('preview-distinctive').textContent = document.getElementById('distinctive-signs').value || '—';
        
        // Compétences générales
        document.getElementById('preview-vitality').textContent = document.getElementById('vitality').value;
        document.getElementById('preview-physical-strength').textContent = document.getElementById('physical-strength').value;
        document.getElementById('preview-agility').textContent = document.getElementById('agility').value;
        document.getElementById('preview-magical-strength').textContent = document.getElementById('magical-strength').value;
        
        // Compétences spéciales
        const specialSkills = [];
        const specialSkillNames = document.getElementsByName('special-skill-name[]');
        const specialSkillLevels = document.getElementsByName('special-skill-level[]');
        
        for (let i = 0; i < specialSkillNames.length; i++) {
            if (specialSkillNames[i].value.trim()) {
                specialSkills.push(`<li><strong>${specialSkillNames[i].value}:</strong> niveau ${specialSkillLevels[i].value}</li>`);
            }
        }
        document.getElementById('preview-special-skills').innerHTML = specialSkills.length > 0 ? specialSkills.join('') : '<li>—</li>';
        
        // Caractéristiques
        const characteristics = [];
        const characteristicNames = document.getElementsByName('characteristic-name[]');
        const characteristicRarities = document.getElementsByName('characteristic-rarity[]');
        
        for (let i = 0; i < characteristicNames.length; i++) {
            if (characteristicNames[i].value.trim()) {
                const rarity = characteristicRarities[i].value ? ` (${characteristicRarities[i].value})` : '';
                characteristics.push(`<li>${characteristicNames[i].value}${rarity}</li>`);
            }
        }
        document.getElementById('preview-characteristics').innerHTML = characteristics.length > 0 ? characteristics.join('') : '<li>—</li>';
        
        // Constellation
        document.getElementById('preview-constellation').textContent = document.getElementById('constellation-name').value || '—';
        document.getElementById('preview-constellation-rank').textContent = document.getElementById('constellation-rank').value || '—';
        
        // Marques de la constellation
        const constellationMarks = [];
        const constellationMarkInputs = document.getElementsByName('constellation-mark[]');
        
        for (let i = 0; i < constellationMarkInputs.length; i++) {
            if (constellationMarkInputs[i].value.trim()) {
                constellationMarks.push(`<li>${constellationMarkInputs[i].value}</li>`);
            }
        }
        document.getElementById('preview-constellation-marks').innerHTML = constellationMarks.length > 0 ? constellationMarks.join('') : '<li>—</li>';
        
        // Histoire
        const history = document.getElementById('character-history').value;
        document.getElementById('preview-history').innerHTML = history ? history.replace(/\n/g, '<br>') : '—';
    }
    
    // Initialiser la prévisualisation
    updatePreview();
    
    // Ajouter des écouteurs d'événements pour mettre à jour la prévisualisation
    const allInputs = document.querySelectorAll('#character-form input, #character-form textarea, #character-form select');
    allInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    // Exportation en Markdown
    const exportBtn = document.getElementById('export-markdown');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('character-name').value || '—';
            const firstname = document.getElementById('character-firstname').value || '—';
            const age = document.getElementById('character-age').value || '—';
            const birthday = document.getElementById('character-birthday').value || '—';
            const gender = document.getElementById('character-gender').value || '—';
            const orientation = document.getElementById('character-orientation').value || '—';
            
            // Traits de caractère
            let traitsMarkdown = '';
            for (let i = 1; i <= 5; i++) {
                const trait = document.getElementById(`character-trait${i}`).value.trim();
                if (trait) {
                    traitsMarkdown += `- ${trait}\n`;
                }
            }
            
            // Goûts et passions
            const tastes = document.getElementById('character-tastes').value || '—';
            const passions = document.getElementById('character-passions').value || '—';
            
            // Description physique et signes distinctifs
            const physical = document.getElementById('physical-description').value || '—';
            const distinctive = document.getElementById('distinctive-signs').value || '—';
            
            // Compétences générales
            const vitality = document.getElementById('vitality').value;
            const physicalStrength = document.getElementById('physical-strength').value;
            const agility = document.getElementById('agility').value;
            const magicalStrength = document.getElementById('magical-strength').value;
            
            // Compétences spéciales
            let specialSkillsMarkdown = '';
            const specialSkillNames = document.getElementsByName('special-skill-name[]');
            const specialSkillLevels = document.getElementsByName('special-skill-level[]');
            
            for (let i = 0; i < specialSkillNames.length; i++) {
                if (specialSkillNames[i].value.trim()) {
                    specialSkillsMarkdown += `- ${specialSkillNames[i].value} (niveau ${specialSkillLevels[i].value})\n`;
                }
            }
            
            // Caractéristiques
            let characteristicsMarkdown = '';
            const characteristicNames = document.getElementsByName('characteristic-name[]');
            const characteristicRarities = document.getElementsByName('characteristic-rarity[]');
            
            for (let i = 0; i < characteristicNames.length; i++) {
                if (characteristicNames[i].value.trim()) {
                    const rarity = characteristicRarities[i].value ? ` (${characteristicRarities[i].value})` : '';
                    characteristicsMarkdown += `- ${characteristicNames[i].value}${rarity}\n`;
                }
            }
            
            // Constellation
            const constellation = document.getElementById('constellation-name').value || '—';
            const constellationRank = document.getElementById('constellation-rank').value || '—';
            
            // Marques de la constellation
            let constellationMarksMarkdown = '';
            const constellationMarkInputs = document.getElementsByName('constellation-mark[]');
            
            for (let i = 0; i < constellationMarkInputs.length; i++) {
                if (constellationMarkInputs[i].value.trim()) {
                    constellationMarksMarkdown += `- ${constellationMarkInputs[i].value}\n`;
                }
            }
            
            // Histoire
            const history = document.getElementById('character-history').value || '—';
            
            // Construire le markdown
            const markdown = `# 🌟 Fiche de personnage - ${firstname} ${name} 🌟

## 𒆜 - Informations de base
- **Nom** : ${name}
- **Prénom** : ${firstname}
- **Age** : ${age}
- **Date de naissance** : ${birthday}
- **Sexe** : ${gender}
- **Orientation** : ${orientation}

## 𒆜 - Caractère
${traitsMarkdown || '- —'}

## 𒆜 - Goûts
${tastes}

## 𒆜 - Passions
${passions}

## 𒆜 - Description physique
${physical}

## 𒆜 - Signe distinctif
${distinctive}

## 𒆜 - Compétences générales
- **Vitalité** : ${vitality}
- **Force physique** : ${physicalStrength}
- **Agilité** : ${agility}
- **Force magique** : ${magicalStrength}

## 𒆜 - Compétences spéciales
${specialSkillsMarkdown || '- —'}

## 𒆜 - Caractéristiques
${characteristicsMarkdown || '- —'}

## 𒆜 - Constellation sponsor
${constellation}

## 𒆜 - Rang de la constellation
${constellationRank}

## 𒆜 - Marques de la constellation
${constellationMarksMarkdown || '- —'}

## 𒆜 - Histoire
${history}
`;
            
            // Créer un élément temporaire pour le téléchargement
            const element = document.createElement('a');
            const file = new Blob([markdown], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `fiche_${firstname}_${name}.md`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }
    
    // Validation du formulaire
    const characterForm = document.getElementById('character-form');
    
    if (characterForm) {
        characterForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Validation des champs obligatoires (à adapter selon vos besoins)
            const requiredFields = ['character-name', 'character-firstname', 'character-age', 'character-gender'];
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Afficher un message d'erreur
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Ce champ est obligatoire';
                    
                    // Vérifier si un message d'erreur existe déjà
                    const existingError = field.parentElement.querySelector('.error-message');
                    if (!existingError) {
                        field.parentElement.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const existingError = field.parentElement.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
                
                // Afficher un message global
                const formWrapper = document.querySelector('.form-wrapper');
                const globalError = document.createElement('div');
                globalError.className = 'alert alert-danger';
                globalError.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
                
                // Vérifier si un message global existe déjà
                const existingGlobalError = formWrapper.querySelector('.alert.alert-danger');
                if (!existingGlobalError) {
                    formWrapper.insertBefore(globalError, characterForm);
                }
                
                // Faire défiler jusqu'à la première erreur
                const firstErrorField = document.querySelector('.error');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});